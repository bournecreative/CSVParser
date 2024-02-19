# CSV uploader - Upload and attach files

Using Node/Express build a backend that will enable a user to upload CSV files, parse them and display the parsed data in the UI.

## Objectives

- [x] endpoint to serve html page with a form that will allow a user to select CSV files and submit the target file
- [x] upload endpoint to capture CSV request
- [x] parse CSV buffer into CSV file and save to server
- [x] create middleware to reject file sizes over 5MB. Provide messaging to user
- [x] create middleware to reject file types that are not CSV. Provide messaging to user
- [x] create middleware to reject if not file data is submitted. Provide messaging to user
- [x] organize express into seperate routes
- [x] incorporate scss for styling and config index.html to work with static assets served from server
- [x] parse CSV data into UI
- [ ] Build modern UI that is responsive and clear
- [ ] config nodemon so all working files reflect changes during development
