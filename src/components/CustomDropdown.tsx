import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { ChevronDown, CalendarRange } from 'lucide-react-native';

const CustomDropdown = ({ data, selectedValue, onValueChange, placeholder }) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    data.find((item) => item.value === selectedValue) || null
  );

  const handleSelect = (item) => {
    setSelectedItem(item);
    onValueChange(item.value);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <CalendarRange size={20} color="#333" />
        <Text style={styles.selectedText}>
          {selectedItem?.label ?? placeholder ?? 'Select an option'}
        </Text>
        <ChevronDown size={20} color="#333" />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.dropdownListContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 50,
  },
  selectedText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Quicksand-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDropdown;
