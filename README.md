# Sprint3-AVS-Project-MVP

Note: March 13, 2021
The Workspace folder includes all files for the functional Node.js site, just like in
the homeworks. The public folder in the workspace holds the site's HTML, CSS, and JS
files.
As of Mar 13, it does not include the necessary files for running the server. If you
wish to do so, simply run 'npm install' in the console in the workspace
folder. After that, 'npm start' should start the server at localhost:3000.
When committing, PLEASE remember to delete the node_modules folder, in order to keep pushes/pulls small. Thank you!
Workspace currently does not include changes from the following branches:
Dan, Haley, Malia, Moses, Trey, Will, and master.
Love, Javascript Backend team <3


Note: March 16, 2021
Deleted the old HTML/CSS folders and moved their code into the workspace today. These files
need to work in the server's context, so from now on, it would be a good idea to get those files to work
from that folder ("Node.JS Server Workspace/public") in order to allow us to get your changes to work
with the rest of the server.
Love, Javascript Backend Team <3

Note: March 24, 2021
This is a copy from sprint 2's repository. All branches but test main were deleted since they were irrlevent. Test main was renamed main. 


Note: April 5, 2021
The add item form works, but should only take info in a particular format:
-Model and Brand should be one word. If these entries have more than one word, just use an underscore "_" for now.
-Categories should be entered as such: "Category1 Category2 Category3" etc.
Uses, Accessories, and Description just take strings. We don't know if strings longer than the SQL size will break things but they probably will.
-Uses: 100 chars
-Accessories: currently unused, no column in the SQL table
-description: 300 chars
On a related note, the image and accessories field are not currently being used, as it was too late to implement them for this sprint.
New items are automatically given an ID and a default reservation length of 0. The image is entered as an empty string by default.
Love, Javascript Backend Team <3