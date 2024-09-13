import React from "react"

function About() {
    return(
        <div className="About">
            <h1 className="text-3xl font-bold text-center mt-8">About Us</h1>
            <p>Welcome to Arugula Week, your all-in-one solution for easy, healthy, and personalized meal planning! We know how challenging it can be to juggle a busy lifestyle while trying to stay on top of your health goals, plan meals, and accommodate family preferences. That's why we created Arugula Week - to simplify meal planning, save time, and help you eat better every day.</p>
            <h1 className="text-3xl font-bold text-center mt-8">Our Mission</h1>
            <p>Our mission is to empower individuals and families to take control of their nutrition by reducing the stress of planning, shopping, and deciding what to eat every day. We believe healthy eating should be enjoyable, accessible, and effortless.</p>
            <h1 className="text-3xl font-bold text-center mt-8">What We Offer</h1>
            <ul>
                <li>Personalized Meal Logging: Easily input what you're eating for each meal, whether it's breakfast, lunch, dinner, or snacks. Keep track of your meals with just a few taps.</li>
                <li>Photo Meal Entries: Snap a picture of your meal and upload it to your daily log. Visual records make it easier to remember and review what you've eaten at a glance.</li>
                <li>Weekly Meal Overview: View your entire week's meals on a single screen. Track your progress, identify trends, and get a clear picture of your eating habits across multiple days.</li>
                <li>Saved Weekly Dashboards: Each week's meal log is saved in your personalized dashboard for easy reference. Review past weeks to track progress, revisit favorite meals, or stay accountable to your goals.</li>
            </ul>
            <h1 className="text-3xl font-bold text-center mt-8">Our Vision</h1>
            <p>At Arugula Week, we’re not just about food—we’re about creating sustainable habits that enhance your life. We envision a world where people feel empowered by what they eat, not overwhelmed. Join us on the journey to better eating, smarter planning, and healthier living.</p>
            <h1 className="text-3xl font-bold text-center mt-8">Our Team</h1>
            <div className="flex items-center">
            <img src="/images/Christian.png" alt="Christian Salgado" className="m-5 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
            <img src="/images/Truong.png" alt="Truong Ngo" className="m-5 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
            <img src="/images/Heather.jpg" alt="Heather Weltzien" className="m-5 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
            <img src="/images/Jason.png" alt="Jason Y. Liu" className="m-5 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
            <img src="/images/Jesus.png" alt="Jesus Ruiz Gutierrez" className="m-5 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"/>
            </div>
            <p>Our team is made up of foodies and tech enthusiasts who are dedicated to making healthy eating accessible to everyone. We're committed to creating a seamless, user-friendly experience that helps you achieve your health goals and enjoy the journey along the way.</p>


        </div>
    )
}

export default About;