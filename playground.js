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

export default class Forecast extends Component {
  constructor(props) {

    this.state = {
      loading: true,
    };
  };

  componentDidMount: function () {
    fetch('https://api.forecast.io/forecast/' + API_KEY + '/45.523220,-122.668752')
      .then(res => res.json())
      .then(resJson => this.setState({ data, loading: false }));
  };

  render: function() {
    if (this.state.loading) {
      return (
        <ActivityIndicator animating size="large" />
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <View style={[styles.section]}>
          //<Image style={styles.image} source={require("./sleet.png")} /> //Image needs to be added. Can also require URI for web based image
          <Text style={styles.header}>{this.state.data.currently.summary}</Text>
        </View>
        <View style=[{styles.section}, styles.lowerSection]>
          <Text style={styles.itemText}>Temperature: {this.state.data.currently.temperature}°</Text>
          <Text style={styles.itemText}>Humidity: {this.state.data.currently.humidity}</Text>
          <Text style={styles.itemText}>Wind Speed: {this.state.data.currently.windSpeed}</Text>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },
  lowerSection: {
    flex: 2,
    justifyContent: "flex-start"
  },
  itemText: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 10
  },
  image: {
    width: 200,
    height: 200
  }
})
