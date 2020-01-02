import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import Svg, {G, Rect, Text} from 'react-native-svg';
import {
  SQUARE_SIZE,
  MONTH_LABELS,
  DAYS_IN_WEEK,
  MONTH_LABEL_GUTTER_SIZE,
  MILLISECONDS_IN_ONE_DAY,
} from './utils/constants';
import {
  shiftDate,
  getBeginningTimeForDate,
  convertToDate,
} from './utils/helpers';
import {
  getWeekCount,
  getStartDateWithEmptyDays,
  getMonthLabelCoordinates,
  getTransformForWeek,
  getNumEmptyDaysAtStart,
  getSquareCoordinates,
  getTitleForIndex,
  getFillColor,
  getCountByDuplicateValues,
  getTooltipDataAttrsForIndex,
  getTooltipDataAttrsForValue,
  getValueForIndex,
  getHeight,
  getWidth,
} from './utils/utils';

const rectColor = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823'];

const CalendarHeatmap = props => {
  const {
    values,
    gutterSize,
    horizontal,
    numDays,
    endDate,
    titleForValue,
    tooltipDataAttrs,
    onPress,
    showOutOfRangeDays,
    showMonthLabels,
    colorArray,
  } = props;

  const getValueCache = values => {
    const countedArray = getCountByDuplicateValues(values);
    return _.reduce(
      values,
      (memo, value) => {
        const date = convertToDate(value.date);
        const index = Math.floor(
          (date - getStartDateWithEmptyDays(numDays, endDate)) /
            MILLISECONDS_IN_ONE_DAY,
        );
        memo[index] = {
          value: value,
        };
        const count = _.find(countedArray, {key: memo[index].value.date});
        memo[index].countedArray = count;

        return memo;
      },
      {},
    );
  };

  useEffect(() => {
    console.log('Value Cache: ', getValueCache(values));
    setValueCache(getValueCache(values));
  }, []);

  const [valueCache, setValueCache] = useState(getValueCache(values));

  const handleClick = (value, index) => {
    if (onPress) {
      onPress(value, index);
    }
  };

  const renderSquare = (dayIndex, index) => {
    const indexOutOfRange =
      index < getNumEmptyDaysAtStart(numDays, endDate) ||
      index >= getNumEmptyDaysAtStart(numDays, endDate) + numDays;
    if (indexOutOfRange && !showOutOfRangeDays) {
      return null;
    }
    const [x, y] = getSquareCoordinates(dayIndex, horizontal, gutterSize);
    const fillColor = getFillColor(index, valueCache, colorArray);
    const value = getValueForIndex(index, valueCache);

    return (
      <Rect
        key={index}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        x={x}
        y={y}
        title={getTitleForIndex(index, valueCache, titleForValue)}
        onPress={() => handleClick(value, index)}
        fill={fillColor}
        {...getTooltipDataAttrsForIndex(index, valueCache, tooltipDataAttrs)}
      />
    );
  };

  const renderWeek = weekIndex => {
    const [x, y] = getTransformForWeek(weekIndex, horizontal, gutterSize);
    return (
      <G key={weekIndex} x={x} y={y}>
        {_.range(DAYS_IN_WEEK).map(dayIndex =>
          renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex),
        )}
      </G>
    );
  };

  const renderAllWeeks = () => {
    return _.range(getWeekCount(numDays, endDate)).map(weekIndex =>
      renderWeek(weekIndex),
    );
  };

  const renderMonthLabels = () => {
    if (!showMonthLabels) {
      return null;
    }
    const weekRange = _.range(getWeekCount(numDays, endDate) - 1); // don't render for last week, because label will be cut off
    return weekRange.map(weekIndex => {
      const endOfWeek = shiftDate(
        getStartDateWithEmptyDays(numDays, endDate),
        (weekIndex + 1) * DAYS_IN_WEEK,
      );
      const [x, y] = getMonthLabelCoordinates(
        weekIndex,
        horizontal,
        gutterSize,
        showMonthLabels,
      );
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <Text key={weekIndex} x={x} y={y + 16}>
          {MONTH_LABELS[endOfWeek.getMonth()]}
        </Text>
      ) : null;
    });
  };

  return (
    <ScrollView>
      <Svg
        height={getHeight(gutterSize, showMonthLabels, horizontal)}
        width={getWidth(numDays, endDate, gutterSize)}>
        <G>{renderMonthLabels()}</G>
        <G>{renderAllWeeks()}</G>
      </Svg>
    </ScrollView>
  );
};

CalendarHeatmap.defaultProps = {
  numDays: 100,
  endDate: new Date(),
  gutterSize: 1,
  horizontal: true,
  showMonthLabels: true,
  showOutOfRangeDays: false,
  colorArray: rectColor,
  classForValue: value => (value ? 'black' : '#8cc665'),
  onPress: () => console.log('change onPress prop'),
};

export default CalendarHeatmap;
