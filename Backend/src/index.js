const express = require('express');
const fs = require('fs');
const path = require('path');
const { createClient} = require('redis');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

const redisClient = createClient();
redisClient.connect();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

function getCourse(regNo){
    const regexArr = {
        '^[0-9]{4}16[0-9]+$': 'bca',
        '^[0-9]{4}22[0-9]+$': 'mca',
        '^[0-9]{4}00[0-9]+$': 'btech',
        '^[0-9]{4}13[0-9]+$': 'btech',
        '^[0-9]{4}23[0-9]+$': 'mba',
        '^[0-9]{4}19[0-9]+$': 'bba',
        '^[0-9]{4}12[0-9]+$': 'msc',
    };
    for(const regex in regexArr){
        if(new RegExp(regex).test(regNo)){
            return regexArr[regex];
        }
    }
    return '';
}

function isEnrolled(regNo, lines){
    for(let i = 3; i < lines.length; i++){
        const parts = lines[i].split('\t');
        if(parts[0] === regNo){
            return true;
        }
    }
    return false;
}

app.get('/results', async (req,res)=>{
    const {exam_session, reg_no} = req.query;
    // console.log(exam_session, reg_no);
    if(!exam_session || !reg_no){
        return res.status(400).json({
            error:'Exam session or registration number is missing!',
        });
    }
    const courseName = getCourse(reg_no);
    if(!courseName){
        return res.status(400).json({
            error:'Invalid registration number!',
        });
    }
    const cacheKey = `${exam_session}_${reg_no}`;
    const cachedData = await redisClient.get(cacheKey);

    if(cachedData){
        console.log('Cache hit');
        return res.status(200).json(JSON.parse(cachedData));
    }

    try{
        const folderPath = path.join(__dirname, '../Results',exam_session,courseName);
        if(!fs.existsSync(folderPath)){
            return res.status(404).json({
                error:'Results not found!',
            });
        }
        let details = [];
        let subDetails = [];

        fs.readdirSync(folderPath).forEach(file => {
            const filePath = path.join(folderPath, file);
            const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
            if(isEnrolled(reg_no, lines)){
                for(let i = 0; i <= 2; i++){
                    const parts = lines[i].split(':');
                    subDetails.push(parts.map(part => part.trim()));
                }
                for(let k = 4; k < lines.length; k++){
                    const parts = lines[k].split('\t');
                    if(parts.length >= 5){
                        details.push({
                            reg_no: parts[0].trim(),
                            int: parts[1].trim(),
                            ext: parts[2].trim(),
                            total: parts[3].trim(),
                            grade: parts[4].trim(),
                        });
                    }
                }
            }
        });
        const result = subDetails.concat(details.filter(detail => detail.reg_no === reg_no));

        await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
        return res.status(200).json(result);

    }catch(error){
        return res.status(500).json({
            error:'Internal server error!',
        });
    }

});

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});
