import {StyleSheet, View, Text} from 'react-native';
// import {Text} from 'victory-native';

type CheckBoxProps = {
  isChecked: boolean;
};

export default function Checkbox({isChecked}: CheckBoxProps) {
  return (
    <View style={CheckboxStyles.wrapper}>
      <View
        style={[
          CheckboxStyles.check,
          isChecked && CheckboxStyles.checked,
        ]}></View>
      <Text
        style={[
          CheckboxStyles.label,
          isChecked && CheckboxStyles.labelChecked,
        ]}>
        Combined
      </Text>
    </View>
  );
}

const CheckboxStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    gap: 15,
  },
  check: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: '#f7f7f7',
    borderColor: '#656565',
    marginRight: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#0BB37B',
    borderColor: '#06744F',
    marginRight: -10,
  },
  label: {
    fontSize: 15,
    color: '#656565',
  },
  labelChecked: {
    color: '#06744F',
  },
});
