function calculate() {
    const hourlyRates = {
        islington: 22,
        gosfordWeekday: 27,
        gosfordWeekend: 30
    };

    const fuelCost = 30;
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    let totalHoursIslington = 0;
    let totalHoursGosfordWeekdays = 0;
    let totalHoursGosfordWeekends = 0;
    let totalFuelCost = 0;

    days.forEach(day => {
        const startTime = document.getElementById(day + 'Start').value;
        const endTime = document.getElementById(day + 'End').value;
        const location = document.getElementById(day + 'Location').value;
        
        if (!startTime || !endTime || !location) {
            return;  // skip this day if any value is missing
        }
        
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        
        if (end < start) {
            end.setDate(end.getDate() + 1);  // account for working past midnight
        }

        const hoursWorked = (end - start) / (1000 * 60 * 60);

        if (location === "islington") {
            totalHoursIslington += hoursWorked;
        } else if (day === "friday" || day === "saturday") {
            totalHoursGosfordWeekends += hoursWorked;
            totalFuelCost += fuelCost;
        } else {
            totalHoursGosfordWeekdays += hoursWorked;
            totalFuelCost += fuelCost;
        }
    });

    const earningsIslington = hourlyRates.islington * totalHoursIslington;
    const earningsGosfordWeekday = hourlyRates.gosfordWeekday * totalHoursGosfordWeekdays;
    const earningsGosfordWeekend = hourlyRates.gosfordWeekend * totalHoursGosfordWeekends;
    
    const totalEarnings = earningsIslington + earningsGosfordWeekday + earningsGosfordWeekend - totalFuelCost;

    const output = `
        Total Hours worked in Islington: ${totalHoursIslington.toFixed(2)} - Earnings: $${earningsIslington.toFixed(2)}<br>
        Total Hours worked in Gosford on Weekdays: ${totalHoursGosfordWeekdays.toFixed(2)} - Earnings: $${earningsGosfordWeekday.toFixed(2)}<br>
        Total Hours worked in Gosford on Weekends: ${totalHoursGosfordWeekends.toFixed(2)} - Earnings: $${earningsGosfordWeekend.toFixed(2)}<br>
        Total Fuel Cost for Gosford: -$${totalFuelCost.toFixed(2)}<br>
        ----------------------------<br>
        Overall Earnings: $${totalEarnings.toFixed(2)}
    `;

    document.getElementById('output').innerHTML = output;
}
