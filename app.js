var React = require('react-native');
var getImage = require('./getImage');

let {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator
} = React;

//Add your api key
var API_KEY = '94e20c84954a9c6a72e544826a540561';

var App = React.createClass({
  getInitialState: function() {
    return {
      temperature: null,
      humidity: null,
      windSpeed: null,
      icon: null,
      summary: '',
      loading: true
    }
  },
  componentWillMount: function() {
    //React native polyfills the fetch api from the web. It actually sends this to the ObjC/Java world and runs the ajax request natively.
    //When we get our response back ( the first .then ) we tell it to return our response converted to json
    //Then we go to our next .then. Because we converted our response to json that means we can access it as an object
    fetch('https://api.forecast.io/forecast/' + API_KEY + '/45.523220,-122.668752')
      .then(res => res.json())
      //this.setState is our method of telling react that we changed something and it needs to re-render our application and figure out what changed
      .then(resJson => this.setState({
        temperature: resJson.currently.temperature,
        humidity: resJson.currently.humidity,
        windSpeed: resJson.currently.windSpeed,
        icon: resJson.currently.icon,
        summary: resJson.currently.summary,
        //We are officially loaded so now we set our loading flag to false
        loading: false
      }))
  },
  //This is the render function. Every react class you create must have a render function that returns one component only
  render: function() {
    //If we are loading then return some a full page view (flex: 1), that centers its children (the Text).
    if (this.state.loading) {
      return (
        <ActivityIndicator animating size="large" />
        // <View style={[styles.container, styles.center]}>
        //   <Text>Loading...</Text>
        // </View>
      )
    }

    //When loading is false we will just render our data because we have it now
    //Images need to have a defined width/height on them, there are some other special things we can do to not require that but for now lets just give it a width/height
    //You'll notice the `{}`. This tells React to evaluate it as JavaScript code versus text.
    //So you can see Temperature: {this.state.temperature}°. It will output the word "Temperature" but then get the value we set from the API right next to it.
    //Temperature: 42.2°
    //We add in some wrapping views and use [] (array) syntax to merge two styles together.
    //Those wrapping views allow us center and align the children content separately.
    // We also can define different flex values if we want.
    // If we wanted the lower portion to take up more space we could have the `numbersContainer` be flex: 2. That means it would be 2 times larger than the iconContainer because the iconContainer is flex: 1
    // We also adjust the width/height from 50 => 200.
    return (
      <View style={styles.container}>
        <View style={[styles.iconContainer, styles.center]}>
          <Image source={getImage(this.state.icon)} style={styles.image} />
          <Text style={styles.summaryText}>{this.state.summary}</Text>
        </View>
        <View style={styles.numbersContainer}>
          <Text style={styles.lowerText}>Temperature: {this.state.temperature}°</Text>
          <Text style={styles.lowerText}>Humidity: {this.state.humidity}</Text>
          <Text style={styles.lowerText}>Wind Speed: {this.state.windSpeed}</Text>
        </View>
      </View>
    )
  }
})

//This creates our StyleSheet, it's just like writing normal css... sort of
const styles = StyleSheet.create({
  //A container, we set flex: 1 which means "take up all available space". Because we are rendering this at the root it takes up the entire screen.
  container: {
    flex: 1,
    backgroundColor: '#4defd2' // we set the background color to a blue green
  },
  //Move the style from inline to an style in the StyleSheet
  image: {
    width: 200,
    height: 200
  },
  // This is the container for the icon and summary
  iconContainer: {
    flex: 1
  },
  // This is the container for the lower numbers
  numbersContainer: {
    flex: 1,
    alignItems: 'center' // we only want to center it in the middle horizontally and not vertically
  },
  // Text style for the summary text
  // Make the text larger, and also thickish
  summaryText: {
    fontSize: 32,
    fontWeight: "300"
  },
  // Text style for the lower text
  // Set the font size to smallish, and the text really thin, and add spacing on top and bottom
  lowerText: {
    fontSize: 22,
    fontWeight: "100",
    marginTop: 10,
    marginBottom: 10,
    //marginVertical: 10 we could just do marginVertical, it's specific for react-native and not a web standard
  },
  //This tells react to center all content horizontally, and vertically. Basically putting the thing in the middle of the screen.
  center: {
    alignItems: 'center', // center content horizontally in the middle
    justifyContent: 'center'// center content vertically
  }
})

//Export our component so that other things can use it.
module.exports = App;
