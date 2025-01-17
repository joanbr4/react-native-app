// import React, {useState} from 'react';
// import {
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {
//   VictoryBar,
//   VictoryLine,
//   VictoryChart,
//   VictoryTheme,
//   VictoryAxis,
//   VictoryZoomContainer,
//   VictoryTooltip,
//   VictoryVoronoiContainer,
// } from 'victory-native';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import {bloodPresureMock} from './dataMock.ts/presionArterial';
// import {weightMock} from './dataMock.ts/weight';

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 24, // Large enough to stand out
//     fontWeight: 'bold', // Bold for emphasis
//     color: '#475D9D', // Matches or complements the chart color
//     textAlign: 'center', // Centers the title horizontally
//     marginBottom: 10, // Adds space below the title for the chart
//     textTransform: 'uppercase', // Gives it a formal style
//     letterSpacing: 1,
//   },
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#f5fcff',
//   },
//   boxOptions: {
//     backgroundColor: 'gold',
//     width: '100%',
//   },
//   labelButton: {
//     fontSize: 20,
//     borderWidth: 1,
//     width: 160,
//     height: 60,
//     backgroundColor: '#E9ECEF',
//     borderRadius: 12,
//     flexDirection: 'row',
//     paddingVertical: 2,
//     // color: 'white',
//     // justifyContent: 'center',

//     textAlign: 'center',
//   },
//   containerChart: {
//     width: 400,
//   },
//   scrollContent: {
//     flexDirection: 'row',
//     alignItems: 'flex-end', // Align bars at the bottom
//   },
// });

// const initialOptions = {
//   peso: false,
//   glucograma: false,
//   diastolic: false,
//   systolic: true,
// };

// export const Settings = () => {
//   const [options, setOptions] = useState<typeof initialOptions>(initialOptions);
//   const [modal, setModal] = useState<boolean>(false);
//   const data1 = bloodPresureMock.map(item => {
//     const date = item.date.split('-')[2];
//     return {
//       x: date,
//       y: item.systolic,
//     };
//   });
//   const data2 = bloodPresureMock.map(item => {
//     const date = item.date.split('-')[2];
//     return {
//       x: date,
//       y: item.diastolic,
//     };
//   });
//   const dataWeight = weightMock.weight_data.map(item => {
//     const date = item.date.split('-')[2];
//     return {
//       x: date,
//       y: item.weight,
//     };
//   });

//   const ticks = 6;
//   // const syastolicRange = [50, 150];
//   // const dyastolicRange = [50, 100];

//   const tickFormat = (
//     prop: 'weight' | 'systolic' | 'diastolic',
//     // prop: keyof Omit<(typeof bloodPresureMock)[0], 'time' | 'date'>,
//   ) => {
//     // const range: number[] = [];
//     let values: number[] = [];
//     if (prop !== 'weight') {
//       values = bloodPresureMock.map(item => item[prop]);
//     } else {
//       values = weightMock.weight_data.map(item => item[prop]);
//     }
//     const max = Math.max(...values);
//     const min = Math.min(...values);
//     const padding = 2;
//     const range = max + padding - (min - padding);
//     const step = range / ticks;

//     const tickAxisY = [];
//     let startValue = min - padding;
//     while (tickAxisY.length <= ticks) {
//       tickAxisY.push(startValue.toFixed());
//       startValue += step;
//     }
//     console.log('gola', tickAxisY);
//     return tickAxisY;
//   };

//   const normalize = (range: number[], props: string) => datum =>
//     datum[props] / ((range[1] - range[0]) / ticks);

//   // const axisSystolic = data2.map(item => parseInt(item.quarter));

//   // const tickValues = _.range(ticks + 1);

//   // const domain = {y: [0, ticks]};
//   console.log(options);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{justifyContent: 'center', alignItems: 'center'}}>
//         <Pressable onPress={() => setModal(!modal)}>
//           <Text style={styles.labelButton}>
//             {!modal ? 'Añadir parámetros' : 'Ocultar parámetros'}
//           </Text>
//         </Pressable>
//         {modal && (
//           <View style={styles.boxOptions}>
//             <BouncyCheckbox
//               size={40}
//               fillColor="red"
//               unFillColor="#FFFFFF"
//               text="Peso"
//               // textComponent
//               iconStyle={{borderColor: 'red'}}
//               innerIconStyle={{borderWidth: 2}}
//               textStyle={{fontFamily: 'JosefinSans-Regular'}}
//               onPress={(isChecked: boolean) => {
//                 setOptions({...options, peso: isChecked});
//                 // console.log(isChecked);
//               }}
//             />
//             <BouncyCheckbox
//               size={40}
//               fillColor="blue"
//               unFillColor="#FFFFFF"
//               text="Glucograma"
//               // textComponent
//               iconStyle={{borderColor: 'red'}}
//               innerIconStyle={{borderWidth: 2}}
//               textStyle={{fontFamily: 'JosefinSans-Regular'}}
//               onPress={(isChecked: boolean) => {
//                 setOptions({...options, glucograma: isChecked});
//                 // console.log(isChecked);
//               }}
//             />
//             <BouncyCheckbox
//               size={40}
//               fillColor="blue"
//               unFillColor="#FFFFFF"
//               text="Diastolic"
//               // textComponent
//               iconStyle={{borderColor: 'red'}}
//               innerIconStyle={{borderWidth: 2}}
//               textStyle={{fontFamily: 'JosefinSans-Regular'}}
//               onPress={(isChecked: boolean) => {
//                 setOptions({...options, diastolic: isChecked});
//                 // console.log(isChecked);
//               }}
//             />
//           </View>
//         )}
//       </View>
//       <Text style={styles.title}>Presion Arterial</Text>
//       {/* <Text>Do you like React Native?</Text> */}

//       <ScrollView
//         horizontal
//         // contentContainerStyle={styles.scrollContent}
//         style={styles.containerChart}>
//         <VictoryChart
//           width={810}
//           theme={VictoryTheme.clean}
//           // containerComponent={
//           //   <VictoryZoomContainer
//           //     zoomDimension="x"
//           //     allowZoom={true}
//           //     allowPan={true}
//           //     zoomDomain={{
//           //       x: [1, 35],
//           //       // y: [0, 100],
//           //     }}
//           //   />
//           // }
//           // containerComponent={
//           //   <VictoryVoronoiContainer
//           //     voronoiDimension="x"
//           //     labels={({datum}) => `y: ${datum.y}`}
//           //     labelComponent={<VictoryTooltip />}
//           //   />
//           // }
//           // domain={{domain.y}}
//           // domain={{y: [50, ticks]}}
//         >
//           <VictoryAxis crossAxis label="Day" />
//           <VictoryAxis
//             dependentAxis
//             label="Systolic"
//             // tickFormat={t => `${t} mmHg`}
//             // tickFormat={tickFormat(syastolicRange)}
//             // tickFormat={tickFormat('systolic')}
//             // offsetY={30}
//             // tickValues={[0, 11]}
//             style={{
//               axis: {
//                 stroke: 'blue',
//               },
//               ticks: {
//                 stroke: VictoryTheme.clean.palette.blue[3],
//               },
//               tickLabels: {
//                 fill: VictoryTheme.clean.palette.blue[3],
//               },
//             }}
//           />
//           {options.diastolic && (
//             <VictoryAxis
//               dependentAxis
//               label="Diastolic"
//               // tickValues={tickValues}
//               // tickValues={[50, 60, 70, 80, 90, 100, 120]}
//               // tickFormat={t => `${t} mmHg`}
//               // tickFormat={tickFormat('diastolic')}
//               orientation="right"
//               style={{
//                 axis: {
//                   stroke: 'red',
//                 },
//                 ticks: {
//                   stroke: VictoryTheme.clean.palette.red[3],
//                 },
//                 tickLabels: {
//                   fill: VictoryTheme.clean.palette.red[3],
//                 },
//               }}
//             />
//           )}
//           {options.peso && (
//             <VictoryAxis
//               dependentAxis
//               label="Peso"
//               // tickValues={tickValues}
//               tickValues={[50, 60, 70, 80, 90, 100, 120]}
//               // tickFormat={t => `${t} mmHg`}
//               offsetY={90}
//               tickFormat={tickFormat('weight')}
//               orientation="right"
//               style={{
//                 axis: {
//                   stroke: 'red',
//                 },
//                 ticks: {
//                   stroke: VictoryTheme.clean.palette.red[3],
//                 },
//                 tickLabels: {
//                   fill: VictoryTheme.clean.palette.red[3],
//                 },
//               }}
//             />
//           )}
//           {/* <ScrollView horizontal> */}
//           <VictoryLine
//             data={data1}
//             samples={10}
//             x="x"
//             // labelComponent={<VictoryTooltip />} // no funcina en line
//             // containerComponent={
//             //   <VictoryVoronoiContainer
//             //     voronoiDimension="x"
//             //     labels={({datum}) => `y: ${datum.y}`}
//             //     labelComponent={<VictoryTooltip />}
//             //   />
//             // }
//             // labels={({datum}) => datum.y}
//             // y={normalize(syastolicRange, 'systolic')}
//             style={{
//               data: {
//                 stroke: VictoryTheme.clean.palette.blue[3],
//               },
//             }}
//           />
//           {options.peso && (
//             <VictoryBar
//               data={dataWeight}
//               labelComponent={<VictoryTooltip />}
//               labels={({datum}) => datum.y}
//               // containerComponent={
//               //   <VictoryZoomContainer
//               //     zoomDomain={{
//               //       x: [5, 35],
//               //       y: [0, 100],
//               //     }}
//               //   />
//               // }
//             />
//           )}
//           {options.diastolic && (
//             <VictoryLine
//               data={data2}
//               // x="x"
//               // y={axisSystolic}
//               // y="y"
//               // y={normalize(axisSystolic, 'earnings')}
//               style={{
//                 data: {
//                   stroke: VictoryTheme.clean.palette.red[3],
//                 },
//               }}
//             />
//           )}
//           {/* </ScrollView> */}
//         </VictoryChart>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
