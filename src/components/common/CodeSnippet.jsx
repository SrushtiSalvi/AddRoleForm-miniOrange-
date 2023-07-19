import React from "react";
import { useSelector } from "react-redux";

const CodeSnippet = () => {
  const user = useSelector((state) => state.user.user);
  const obj = `{
    "objectType": "list",
    "uri": "",
    "data": [
        {
        "roleName": "Custom",
        "description": "Lorem ipsum",
        "inheritCapabilitiesFrom": 'Admin',
        "capabilties":[
            adminCapabiltites:{list of capabilities objects},
            enduserCapabilities:{list of capabilities objects},
        ]
        
        }
    ]
}`;
  return (
    <pre>
      <code>{obj}</code>
    </pre>
  );
};

export default CodeSnippet;
