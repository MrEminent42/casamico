This is a Cal Poly CSC 308/309 project and is intended to comply with standard software engineering practices.
# casamico
A task tracker for your house! You can see the deployed (live) version of the website here: https://casamico.netlify.app/

## Contributing

1. Clone this repo locally

2. Install NodeJS and NPM, LTS version 18.18.0: https://nodejs.org/en/download

3. In this repo's directory, run `npm i` to install all the required packages associated with this project

4. In this repo's directory, run `npm start` to start the program and run the website. You can access it at `http://localhost:3000`.

5. Make & checkout to a feature branch with `git branch feature-branch-name` and `git checkout feature-branch-name` 

6. Make your changes

7. Make a pull request and get your stuff merged!


## Description
A task tracker for your AirBnB/rental home.

## Design

### Definitions

* Task: a database entry with the following characteristics:
    * title,
    * description, 
    * due date(s),
    * occurrence type (single or recurring), 
    * icon,
    * tag(s), 
    * associated room(s), and
    * status (whether or not it has been completed).
* Overdue Task: a Task that is past its due date but is not yet completed.
* Host: the primary owner or manager of a property (a single person or entity).
* Access Date: date where the property Host has access to the property.
* Away Period: a duration for which the property Host DOES NOT have access to the property.
* Agent: (Legal term) anyone acting in place of the Host, at the host’s request.
* Filterable characteristics: due date, tag(s), occurrence type, room(s), status.
* Sortable characteristics: title, due date, status.

### User Stories

1. As a Host,* I want to add custom Tasks*, so that I can keep track of Tasks* in my house. 
2. As a Host,* I want to mark Tasks* as completed, so that 2. I can focus only on Tasks* that need to be completed.
3. As a Host,* I want to view a list of incomplete Tasks* that are due on or before my next Access Date* based on my input of upcoming Access Dates,* so that I can complete these Tasks* when I visit my property.
4. As a Host,* I want to update existing Tasks’* characteristics, so that I can ensure the information is current when changes occur.
5. As a Host,* I want assign custom tags to Tasks*, so that I can organize similar Tasks.*
6. As a Host,* I want to mark each Task* with a customizable icon, so that I can easily tell what type of work the Task* entails.
7. As a Host,* I want to export all Tasks* to be completed on a specific Access Date* to a CSV, so that my Agents* can complete those Tasks.
8. As a Host,* I want to copy tasks associated with a room and assign them to other rooms, so that I can more efficiently assign tasks for similar rooms.
9. As a Host,* I want to filter Tasks* by their characteristics, so that I can aggregate Tasks.*
10. As a Host,* I want to sort Tasks* by their characteristics, so that I can aggregate Tasks.*
11. As a Host,* I want to perform perform US 1-10 for multiple properties, so that I can manage the Tasks* in multiple properties under one profile.
12. As a Host,* I want to perform US 1-10 for one property at a time, so that I can focus on a single property without distraction.

### Functional Requirements

1.The system shall provide a form for the user to create and update a Task*.

2. The system shall provide a form for the user to create custom tags (see Task*).

3. The system shall provide a form for the user to set a Task's* icon.

4. The system shall provide a list of Tasks* that is:
Sorted by selected Sortable Characteristics*, or
Filtered by selected Filterable Characteristics*, or
Unsorted and unfiltered.

5. The system shall provide a view of a Task’s characteristics when a Task is opened.

6. The system shall provide a toggle to mark a Task* as “not completed” or “completed”.

7. The system shall provide a CSV file of the Task* list as displayed.

8. The system shall provide a list of Tasks* due on or before the end date of the next Away Period*.

9. The system shall provide a list of Tasks* due on or before the 10th day after the next Access Date*.

10. The system shall copy Tasks* to selected room.

11. The system shall provide a card view dashboard of all properties, with each card showing a photo and address and linking to the property with a list view of all its corresponding tasks. 

12. The system shall provide FRs 1-10 for multiple properties.
