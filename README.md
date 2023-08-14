# Admitted

Admitted is a "hospital patient assistant" you can use to keep track of information during your hospital stay. 

Its straightforward interface allows you to record the people you interact with, the medications you're taking (as well as each dose), significant events, and questions for your doctor.

## Testing Instructions

After cloning this repository to your own machine,

**Create the Database:**
1. Open Visual Studio.
2. At the start screen, select `Open a Local Folder`.
4. Navigate to your workspace directory, open the `Admitted` folder, then select the SQL folder.
5. Execute BOTH .sql files in the [SQL folder](https://github.com/guacajoely/Admitted/tree/main/SQL) with the green play button in the top left of the window. (The first file creates the database and tables if they don’t already exist, and the second file inserts some sample data into those tables for testing)

**Run the API:**
1. Open Visual Studio.
2. At the start screen, select `Open a project or solution`.
3. Navigate to your workspace directory, open the `Admitted` folder, and select the **.sln** file to run the solution.
4. Hit the Green play button on the toolbar that says "Admitted".
5. This will run the API along with an API tool [Swagger](https://swagger.io/docs/specification/2-0/what-is-swagger/) for testing at the address `https://localhost:5001/swagger/index` and open it in your default browser.

**Run the Client:**
1. In your command line, cd into the [Client Folder](https://github.com/guacajoely/Admitted/tree/main/Admitted/Client/admitted), and into the folder named `Admitted`.
2. Run `npm install react-scripts`. Once this has been installed, run `npm start`.
3. This will run the React app at the address `http://localhost:3000/` and open it in your default browser.

   
