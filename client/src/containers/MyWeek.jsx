import React from "react"

function MyWeek() {
    return(
        <div className="My-Week">
            <div className="grid grid-cols-5 gap-4">
            <div className="dayColumn">Monday
            <div className="mealColumn">Breakfast</div>
            <div className="mealColumn">Lunch</div>
            <div className="mealColumn">Dinner</div>
            </div>
            <div className="dayColumn">Tuesday</div>
            <div className="dayColumn">Wednesday</div>
            <div className="dayColumn">Thursday</div>
            <div className="dayColumn">Friday</div>
            </div>
        </div>
    )
}

export default MyWeek;