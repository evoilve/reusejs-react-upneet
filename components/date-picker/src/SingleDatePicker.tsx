import React, { useEffect, useState } from "react";
import { useDayzed } from "dayzed";
import Calendar, { CalendarBaseClassesProps } from "./Calendar";

type DateObj = {
	date: Date;
	nextMonth: boolean;
	prevMonth: boolean;
	selectable: boolean;
	selected: boolean;
	today: boolean;
};

export interface SingleDatePickerProps {
	onChange: (date: Date) => void;
	selected: Date;
	maxDate?: Date;
	minDate?: Date;
	showOutsideDays?: boolean;
	calendarBaseClasses?: CalendarBaseClassesProps;
	prevMonthLabel?: React.ReactNode;
	nextMonthLabel?: React.ReactNode;
}

export default function SingleDatePicker({
	selected = new Date(),
	onChange,
	minDate,
	maxDate,
	showOutsideDays = true,
	calendarBaseClasses,
	prevMonthLabel,
	nextMonthLabel,
}: SingleDatePickerProps) {
	const [selectedDate, setSelectedDate] = useState<Date>(selected);

	const handleOnDateSelected = (date: DateObj): void => {
		setSelectedDate(date.date);
		onChange(date.date);
	};

	useEffect(() => {
		setSelectedDate(selected);
	}, [selected]);

	const dayzedData = useDayzed({
		date: selectedDate,
		minDate: minDate,
		maxDate: maxDate,
		selected: selectedDate,
		onDateSelected: handleOnDateSelected,
		showOutsideDays: showOutsideDays,
	});

	return (
		<Calendar
			{...dayzedData}
			calendarBaseClasses={calendarBaseClasses}
			prevMonthLabel={prevMonthLabel}
			nextMonthLabel={nextMonthLabel}
		/>
	);
}
