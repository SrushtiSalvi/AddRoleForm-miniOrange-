import { useState } from "react";

const dataArr = [
  {
    name: "Users & Groups",
    description: "Capability Description here lorem ipsum",
    id: 0,
    capabilities: [
      {
        name: "Manage",
        id: 1,
        subcategories: [
          {
            id: 1,
            name: "Manage social account linking and invitation",
            checked: false,
          },
          { id: 2, name: "View users", checked: false },
          { id: 3, name: "View locked / disabled users", checked: false },
          { id: 4, name: "Allow admin to delete users", checked: false },
          { id: 5, name: "Allow admin to edit users", checked: false },
          { id: 6, name: "Manage shared identity", checked: false },
        ],
        checked: false,
        partiallyChecked: false,
      },
      {
        name: "Security",
        id: 2,
        subcategories: [{ name: "Update device limit", checked: false, id: 1 }],
        checked: false,
        partiallyChecked: false,
      },
    ],
  },
];

export default function App() {
  const [listData, setListData] = useState(dataArr);

  const handleChildCheckBox = (parentId, capabilityId, subcategoryId) => {
    const updatedData = listData.map((data) => {
      if (data.id === parentId) {
        const capabilities = data.capabilities.map((capability) => {
          if (capability.id === capabilityId) {
            const subcategories = capability.subcategories.map(
              (subcategory) => {
                if (subcategory.id === subcategoryId) {
                  return {
                    ...subcategory,
                    checked: !subcategory.checked,
                  };
                }
                return subcategory;
              }
            );
            return {
              ...capability,
              subcategories,
            };
          }
          return capability;
        });
        return {
          ...data,
          capabilities,
        };
      }
      return data;
    });
    setListData(updatedData);
  };

  const handleCapabilityCheckBox = (parentId, capabilityId) => {
    const updatedData = listData.map((data) => {
      if (data.id === parentId) {
        const capabilities = data.capabilities.map((capability) => {
          if (capability.id === capabilityId) {
            const allSubcategoriesSelected = capability.subcategories.every(
              (subcategory) => subcategory.checked
            );

            const subcategories = capability.subcategories.map(
              (subcategory) => ({
                ...subcategory,
                checked: !allSubcategoriesSelected,
              })
            );

            return {
              ...capability,
              subcategories,
            };
          }
          return capability;
        });

        return {
          ...data,
          capabilities,
        };
      }
      return data;
    });
    setListData(updatedData);
  };

  const handleParentCheckBox = (parentId) => {
    const updatedData = listData.map((data) => {
      if (data.id === parentId) {
        const allCapabilitiesSelected = data.capabilities.every((capability) =>
          capability.subcategories.every((subcategory) => subcategory.checked)
        );

        const capabilities = data.capabilities.map((capability) => {
          const subcategories = capability.subcategories.map((subcategory) => ({
            ...subcategory,
            checked: !allCapabilitiesSelected,
          }));
          return {
            ...capability,
            subcategories,
          };
        });

        return {
          ...data,
          capabilities,
        };
      }
      return data;
    });
    setListData(updatedData);
  };

  return (
    <div className="App">
      {listData.map((data) => (
        <div key={data.id}>
          <label>
            {/* <input
              type="checkbox"
              checked={data.capabilities.every((capability) =>
                capability.subcategories.every(
                  (subcategory) => subcategory.checked
                )
              )}
              onChange={() => handleParentCheckBox(data.id)}
            /> */}
            {data.name}
          </label>
          {/* <div></div> */}
          {data.capabilities.map((capability) => (
            <div
              key={capability.id}
              className="d-flex justifyContent-start flex-column my-3"
            >
              <label>
                <input
                  type="checkbox"
                  checked={capability.subcategories.every(
                    (subcategory) => subcategory.checked
                  )}
                  onChange={() =>
                    handleCapabilityCheckBox(data.id, capability.id)
                  }
                />
                {capability.name}
              </label>
              <div>
                {capability.subcategories.map((subcategory) => (
                  <div key={subcategory.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={subcategory.checked}
                        onChange={() =>
                          handleChildCheckBox(
                            data.id,
                            capability.id,
                            subcategory.id
                          )
                        }
                      />
                      {subcategory.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
