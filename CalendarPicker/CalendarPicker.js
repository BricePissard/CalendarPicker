/**
 * Calendar Picker Component
 * By Stephani Alves - April 11, 2015
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

var {
  WEEKDAYS,
  MONTHS,
  MAX_ROWS,
  MAX_COLUMNS,
  getDaysInMonth,
} = require('./Util');

var styles = require('./Styles');

var Day = React.createClass({
  propTypes: {
    today: React.PropTypes.instanceOf(Date),
    date: React.PropTypes.instanceOf(Date),
    currentDate: React.PropTypes.instanceOf(Date),
    styleSelected: View.propTypes.style,
    stylePast: View.propTypes.style,
    onDayChange: React.PropTypes.func,
    selected: React.PropTypes.bool,
    day: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]).isRequired
  },
  getDefaultProps () {
    return {
      onDayChange () {}
    }
  },
  render() {
    var t = this.props.today,
      oneDay = 24*60*60*1000,
      c = this.props.currentDate,
      tt = t.getDate()+t.getMonth()+t.getFullYear(),
      cc = c.getDate()+c.getMonth()+c.getFullYear(),
      isToday = tt == cc,
      isThisMonth = t.getMonth() == c.getMonth(),
      isPast = !isThisMonth && t-oneDay > c;
    //console.log(c,t);
    if (this.props.selected) {
      return (
        <View style={styles.dayWrapper}>
          <View style={[
            ((!isPast)?styles.dayButtonSelected:null),
            ((!isPast)?this.props.styleSelected:null)
          ]}>
            <TouchableOpacity
              style={[styles.dayButton,((isPast)? this.props.stylePast : null)]}
              onPress={()=>this.props.onDayChange(this.props.day)}>
              <Text style={[styles.dayLabel,{color:(!isPast)?'#fff':'#999'}]}>
                {this.props.day}
              </Text>
              {((isToday)?
                <View style={[styles.todayPoint,{backgroundColor:'#fff'}]}/>
                :
                null
              )}
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.dayWrapper}>
          <TouchableOpacity
            style={[styles.dayButton,((isPast)? this.props.stylePast : null)]}
            onPress={()=>(!isPast)?this.props.onDayChange(this.props.day):null}>
            <Text style={[styles.dayLabel,(isPast)?{color:'#999'}:null]}>
              {this.props.day}
            </Text>
            {((isToday && isThisMonth)?
              <View style={[styles.todayPoint,{backgroundColor:'#0d81ec'}]}/>
              :
              null
            )}
          </TouchableOpacity>
        </View>
      );
    }
  }
});

var Days = React.createClass({
  propTypes: {
    styleSelected: View.propTypes.style,
    stylePast: View.propTypes.style,
    date: React.PropTypes.instanceOf(Date).isRequired,
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
    onDayChange: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      selectedStates: [],
    };
  },

  componentDidMount() {
    this.updateSelectedStates(this.props.date.getDate());
  },

  updateSelectedStates(day) {
    var selectedStates = [],
      daysInMonth = getDaysInMonth(this.props.month, this.props.year),
      i;

    for (i = 1; i <= daysInMonth; i++) {
      if (i === day) {
        selectedStates.push(true);
      } else {
        selectedStates.push(false);
      }
    }

    this.setState({
      selectedStates: selectedStates,
    });

  },

  onPressDay(day) {
    this.updateSelectedStates(day);
    this.props.onDayChange({day: day});
  },

  // Not going to touch this one - I'd look at whether there is a more functional
  // way you can do this using something like `range`, `map`, `partition` and such
  // (see underscore.js), or just break it up into steps: first generate the array for
  // data, then map that into the components
  getCalendarDays() {
    var columns,
      matrix = [],
      i,
      j,
      month = this.props.month,
      year = this.props.year,
      currentDay = 0,
      thisMonthFirstDay = new Date(year, month, 1),
      today = new Date(),
      slotsAccumulator = 0;

    for(i = 0; i < MAX_ROWS; i++ ) { // Week rows
      columns = [];

      for(j = 0; j < MAX_COLUMNS; j++) { // Day columns
        if (slotsAccumulator >= thisMonthFirstDay.getDay()) {
          if (currentDay < getDaysInMonth(month, year)) {
            columns.push(<Day
              key={j}
              today={today}
              currentDate={new Date(year, month, currentDay+1)}
              day={currentDay+1}
              styleSelected={this.props.styleSelected}
              stylePast={this.props.stylePast}
              selected={this.state.selectedStates[currentDay]}
              date={this.props.date}
              onDayChange={this.onPressDay}
            />);
            currentDay++;
          }
        } else {
          columns.push(<Day
            key={j}
            today={today}
            currentDate={new Date(year, month, currentDay+1)}
            day={''}
          />);
        }

        slotsAccumulator++;
      }
      matrix[i] = [];
      matrix[i].push(<View style={styles.weekRow}>{columns}</View>);
    }

    return matrix;
  },

  render() {
    return <View style={styles.daysWrapper}>{ this.getCalendarDays() }</View>;
  }

});

var WeekDaysLabels = React.createClass({
  propTypes: {
    hideWeekDays: React.PropTypes.bool,
  },
  render() {
    return (
      <View style={[
        styles.dayLabelsWrapper,
        ((this.props.hideWeekDays===true)?{height:0}:'')
      ]}>
        {WEEKDAYS.map((day, key) => {
          return <Text key={key} style={styles.dayLabels}>{day}</Text>
        })}
      </View>
    );
  }
});

var HeaderControls = React.createClass({
  propTypes: {
    month: React.PropTypes.number.isRequired,
    getNextYear: React.PropTypes.func.isRequired,
    getPrevYear: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired,
    previousContent: React.PropTypes.element,
    nextContent: React.PropTypes.element,
  },
  getInitialState() {
    return {
      selectedMonth: this.props.month
    };
  },

  // Logic seems a bit awkawardly split up between here and the CalendarPicker
  // component, eg: getNextYear is actually modifying the state of the parent,
  // could just let header controls hold all of the logic and have CalendarPicker
  // `onChange` callback fire and update itself on each change
  getNext() {
    var next = this.state.selectedMonth + 1;
    if (next > 11) {
      this.setState({ selectedMonth: 0 });
      this.props.getNextYear();
    } else {
      this.setState({ selectedMonth: next });
    }

    this.props.onMonthChange(this.state.selectedMonth);
  },

  getPrevious() {
    var prev = this.state.selectedMonth - 1;
    if (prev < 0) {
      this.setState({ selectedMonth: 11 });
      this.props.getPrevYear();
    } else {
      this.setState({ selectedMonth: prev });
    }

    this.props.onMonthChange(this.state.selectedMonth);
  },

  render() {
    return (
      <View style={styles.headerWrapper}>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={this.getPrevious}>
          {((this.props.previousContent)?
            this.props.previousContent
            :
            <Text style={styles.prev}>Previous</Text>
          )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.monthLabel}>
            { MONTHS[this.state.selectedMonth] } { this.props.year }
          </Text>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={this.getNext}>
          {((this.props.nextContent)?
            this.props.nextContent
            :
            <Text style={styles.next}>Next</Text>
          )}
          </TouchableOpacity>
        </View>

      </View>
    );
  }
});

var CalendarPicker = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    styleSelected: View.propTypes.style,
    stylePast: View.propTypes.style,
    selectedDate: React.PropTypes.instanceOf(Date).isRequired,
    onDateChange: React.PropTypes.func,
    previousContent: React.PropTypes.element,
    nextContent: React.PropTypes.element,
    hideWeekDays: React.PropTypes.bool,
  },
  getDefaultProps() {
    return {
      onDateChange () {}
    }
  },
  getInitialState() {
    return {
      date: this.props.selectedDate,
      day: this.props.selectedDate.getDate(),
      month: this.props.selectedDate.getMonth(),
      year: this.props.selectedDate.getFullYear(),
      selectedDay: [],
    };
  },

  onDayChange(day) {
    this.setState({day: day.day,});
    this.onDateChange();
  },

  onMonthChange(month) {
    this.setState({month: month,});
    this.onDateChange();
  },

  getNextYear(){
    this.setState({year: this.state.year + 1,});
    this.onDateChange();
  },

  getPrevYear() {
    this.setState({year: this.state.year - 1,});
    this.onDateChange();
  },

  onDateChange() {
    var {
      day,
      month,
      year
    } = this.state,
      date = new Date(year, month, day);

    this.setState({date: date,});
    this.props.onDateChange(date);
  },

  render() {
    return (
      <View style={[styles.calendar, this.props.style]}>
        <HeaderControls
          year= {this.state.year}
          month={this.state.month}
          onMonthChange={this.onMonthChange}
          getNextYear={this.getNextYear}
          getPrevYear={this.getPrevYear}
          previousContent={this.props.previousContent}
          nextContent={this.props.nextContent}
        />
        <WeekDaysLabels hideWeekDays={this.props.hideWeekDays} />
        <Days
          styleSelected={this.props.styleSelected}
          stylePast={this.props.stylePast}
          month={this.state.month}
          year={this.state.year}
          date={this.state.date}
          onDayChange={this.onDayChange}
        />
      </View>
    );
  }
});

module.exports = CalendarPicker;
