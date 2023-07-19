import React from "react";
import { useSelector } from "react-redux";

const CodeSnippet = () => {
  const user = useSelector((state) => state.user.user);
  const obj = `{
    "objectType": "list",
    "uri": "",
    "data": 
        {
        "roleName": "Custom",
        "description": "Lorem ipsum",
        "inheritCapabilitiesFrom": 'Admin',
        "capabilties":{
            adminCapabiltites:[
              {
                "id": 1,
                "name": "Manage social account linking and invitation",
                "checked": false
              },
              {
                "id": 2,
                "name": "View users",
                "checked": false
              },
              {
                "id": 3,
                "name": "View locked / disabled users",
                "checked": false
              },
              {
                "id": 4,
                "name": "Allow admin to delete users",
                "checked": false
              },
              {
                "id": 5,
                "name": "Allow admin to edit users",
                "checked": false
              },
              {
                "id": 6,
                "name": "Manage shared identity",
                "checked": false
              }
            ],
            enduserCapabilities:[
                  {
                    "id": 1,
                    "name": "Manage social account linking and invitation",
                    "checked": false
                  },
                  {
                    "id": 2,
                    "name": "View users",
                    "checked": false
                  },
                  {
                    "id": 3,
                    "name": "View locked / disabled users",
                    "checked": false
                  },
                  {
                    "id": 4,
                    "name": "Allow admin to delete users",
                    "checked": false
                  },
                  {
                    "id": 5,
                    "name": "Allow admin to edit users",
                    "checked": false
                  },
                  {
                    "id": 6,
                    "name": "Manage shared identity",
                    "checked": false
                  }
            ]
        }
    }`;
  return (
    <pre>
      <code>{obj}</code>
    </pre>
  );
};

export default CodeSnippet;
