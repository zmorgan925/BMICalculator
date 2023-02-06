import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Pressable from './components/Button';


SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

export default class App extends Component {
  state = {
    results: '',
    height: '',
    weight: '',
    showThing: false,
  };

  onHeightChange = (height) => this.setState({ height });
  onWeightChange = (weight) => this.setState({ weight });

  calculate = async () => {
    const { height, weight } = this.state;
    try {
      this.setState({showThing: true});
      this.setState({ results: ((weight / ( height * height  )) * 703).toFixed(1) });
        }
    catch (error) {
      Alert.alert('Error', `There was an error trying to calculate: ${error}`);
    }
  }

  render() {
    const { results, height, weight } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>BMI Calculator</Text>
        <View>
        <TextInput style={styles.input} placeholder="Weight in Pounds" value={weight} onChangeText={this.onWeightChange} />
        <TextInput style={styles.input} placeholder="Height in Inches" value={height} onChangeText={this.onHeightChange} />
        </View>
        <View>
        <Pressable style={styles.button} label="Compute BMI" onPress={this.calculate} />
        </View>
        <ScrollView style={styles.content}>
        <View style={styles.preview}>
          {
            this.state.showThing &&
          <Text style={styles.preview}>Body Mass Index is {results}</Text>
          }
        </View>
        <Text style={styles.bmiText}>Assessing Your BMI</Text>
        <Text style={styles.indent}>Underweight: less than 18.5</Text>
        <Text style={styles.indent}>Healthy: 18.5 to 24.9</Text>
        <Text style={styles.indent}>Overweight: 25.0 to 29.9</Text>
        <Text style={styles.indent}>Obese: 30.0 or higher</Text>
        </ScrollView>
        <View>

        </View>

      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#f4511e',
    color: '#fff',
    textAlign: 'center',
    padding: 25,
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    flex: 1,
    height: 200,
    textAlign: 'center',
    fontSize: 28,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 5,
    fontSize: 24,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  bmiText: {
    fontSize: 20,
  },
  indent: {
    marginLeft: 15,
    fontSize: 20,
  }
});
