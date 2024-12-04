# Project Overview
Your goal is to build a react application that allows users to view other friends local time, in a calendar view similar to google calendar. The application will be built using React and Supabase. 

Technologies Used:
- React for the framework
- Supabase for the database and authentication

# Core Functionalities
## 1. Authentication
- Users can create a new calendar or join an existing one.
- Creating a new calendar requires a calendar name and generates a unique link.
- Joining an existing calendar necessitates the link to the calendar or the unique code.
- All created calendars will be private and stored on Supabase.
- Users can only join a calendar if they have the corresponding calendar ID.


## 2. Navigation bar 
- The navigation bar will display the tool brand name "TimeShare" on the left side.
- The middle section will showcase the calendar ID and include a share link button.
- On the right side, there will be buttons to add friends and sign out.


## 3. Calendar View
- The calendar view will include the navigation bar.
- It will feature a calendar displaying all 24 hours in rows, similar to the Google Day Calendar.
- Friends added by the user will be displayed in their respective local time slots on the calendar.
- Each friend's card will include a profile picture, name, local time, country, and the time difference in hours.
- The friends' cards will have a remove button to allow users to easily delete friends from the calendar.

## Supabase Database details:

- API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobmRjYW1lbmZoaHNtbmFpdWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTI3MzcsImV4cCI6MjA0ODg4ODczN30.jPlnDyiSFQEKW9GCYcbJBoV6AcKER1l4iZFHvyHvMZY

- Project URL: https://shndcamenfhhsmnaiuid.supabase.co