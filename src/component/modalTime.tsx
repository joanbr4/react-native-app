import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';
// import Modal from 'react-native-modal'; // Install via `npm install react-native-modal`

const timeOptions = {
  month: false,
  quarters: false,
};
export const ModalTime = ({
  onClose,
  setTimeLine,
  timeLine,
  data,
}: {
  onClose: () => void;
  setTimeLine: React.Dispatch<
    React.SetStateAction<{
      month: string;
      quarter: number;
    }>
  >;
  timeLine: {
    month: string;
    quarter: number;
  };
  data: {
    x: string;
    y: number;
  }[];
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<typeof timeOptions>(timeOptions);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    setTimeLine({
      month: '',
      quarter: 0,
    });
  }, []);
  const categories = [
    {id: 'month', label: 'Month'},
    {id: 'week', label: 'Week'},
  ];

  const weeks = [
    {id: 'q1_week', label: 'Q1 Week', quarter: 1},
    {id: 'q2_week', label: 'Q2 Week', quarter: 2},
    {id: 'q3_week', label: 'Q3 Week', quarter: 3},
    {id: 'q4_week', label: 'Q4 Week', quarter: 4},
  ];

  const months = [
    {id: 'jan', label: 'January'},
    {id: 'feb', label: 'February'},
    {id: 'mar', label: 'March'},
    {id: 'apr', label: 'April'},
    {id: 'may', label: 'May'},
    {id: 'jun', label: 'June'},
    {id: 'jul', label: 'July'},
    {id: 'aug', label: 'August'},
    {id: 'sep', label: 'September'},
    {id: 'oct', label: 'October'},
    {id: 'nov', label: 'November'},
    {id: 'dec', label: 'December'},
  ];

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);

    if (selectedCategory.month) {
      const valueMonth = months.filter(item => item.id == id)[0];
      setTimeLine({...timeLine, month: valueMonth.label});
    } else if (selectedCategory.quarters) {
      const valueQ = weeks.filter(item => item.id == id)[0];
      setTimeLine({...timeLine, quarter: valueQ.quarter});
    }
  };

  const renderOptions = () => {
    if (selectedCategory.quarters) {
      return weeks;
    } else if (selectedCategory.month) {
      return months;
    }
  };

  return (
    <ScrollView style={styles.modalContainer}>
      <Text style={styles.modalTitle}>
        {selectedCategory ? `Select Month` : 'Select Time Range'}
      </Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => {
          setSelectedCategory({month: true, quarters: false}),
            setShowModal(true);
        }}>
        <Text style={styles.optionText}>
          {timeLine.month != '' ? timeLine.month : 'Month'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.modalTitle}>
        {selectedCategory ? `Select Quarter` : 'Select Time Range'}
      </Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => {
          setSelectedCategory({month: false, quarters: true}),
            setShowModal(true);
        }}>
        <Text style={styles.optionText}>
          {timeLine.quarter != 0 ? 'Q' + timeLine.quarter : 'Quarter Week'}
        </Text>
      </TouchableOpacity>
      <Modal visible={showModal}>
        <FlatList
          data={renderOptions()}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === item.id && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(item.id)}>
              <Text
                style={[
                  styles.optionText,
                  selectedOption === item.id && styles.selectedOptionText,
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          // numColumns={selectedCategory === 'month' ? 2 : 1}
          // columnWrapperStyle={
          //   selectedCategory === 'month' ? styles.gridStyle : undefined
          // }
        />
        {showModal && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowModal(false)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </Modal>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  selectedOptionText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ffc107',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    // color: '#fff',
    fontWeight: 'bold',
  },
  gridStyle: {
    justifyContent: 'space-between',
  },
});
