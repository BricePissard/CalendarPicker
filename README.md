# react-native-calendar-picker
Calendar Picker Component for React Native


This is a Calendar Picker Component for React Native
![alt tag](https://raw.github.com/stephy/CalendarPicker/master/calendarPicker.gif)

To use the calendar you just need to:

	npm install react-native-calendar-picker

How to use it:

	import CalendarPicker from 'react-native-calendar-picker';

	var Calendar = React.createClass({
	  getInitialState: function() {
	    return {
	      date: new Date(),
	    };
	  },

	  onDateChange: function(date) {
	    this.setState({ date: date });
	  },

	  render: function() {
			var PreviousContent = <View><Text>Previous</Text></View>;
			var NextContent = <View><Text>Next</Text></View>;
	    return (
	      <View style={styles.container}>
	        <CalendarPicker
	          style={styles.calendar}
	          styleSelected={styles.calendarSelected}
	          stylePast={styles.calendarPast}
						selectedDate={this.state.date}
	          onDateChange={this.onDateChange}
	          hideWeekDays={false}
						previousContent={PreviousContent}
	          nextContent={NextContent}
					/>		
	        <Text style={styles.selectedDate}>Date:  { this.state.date.toString() } </Text>
	      </View>

	    );
	  }
	});

	const styles = StyleSheet.create({
		calendar: {
	    backgroundColor: "#fff",
	    paddingLeft: 10,
	    paddingRight: 10,
	    marginLeft: 25,
	    marginRight: 25,
	    borderWidth: 0
	  },
	  calendarSelected: {
	    backgroundColor: "#0d81ec",
	    borderRadius: 0,
	    width: 48,
	  },
	  calendarPast: {
	    backgroundColor: "#eaeaea"
	  },
	});

# To Do:

- Add swipe gestures


# Suggestions?

Drop an email to alves@stephanimoroni.com

Open issues

Submit PRs.


# Special thanks

I would like to call out 2 contributors who have been helping me with this project

@edvinerikson

@brentvatne

Thanks you two :)
