function createMenuData(data) {
  //separate the data to create one set for parents and another set for children
  let parentAndChildrenArray = createParentAndChildrenSets(data);

  //use the parent and children sets to create an array of parent-children objects
  return createParentChildrenObjectArray(parentAndChildrenArray);
}

//helper functions
function createParentAndChildrenSets(data){
  //create parent and child sets
  let parentSet = new Set();
  let childrenSet = new Set();

  //loop through each element in 'data'
  data.forEach(function (currentValue) {
    //split current string element by '/'
    let currentParentAndChild = currentValue.split("/");

    //if there is a child in the currentValue string
    if (currentParentAndChild.length > 1) {
      //store the first value of currentParentAndChild array in parentSet
      //and the second value in childrenSet
      parentSet.add(currentParentAndChild[0]);
      childrenSet.add(currentParentAndChild[1]);
    }
  });

  //return the parent and children sets
  return [parentSet, childrenSet];
}

function createParentChildrenObjectArray(parentChildrenSets){
  //separate parentChildrenSets into parent and children sets
  let parentSet = parentChildrenSets[0];
  let childrenSet = parentChildrenSets[1];

  //create an array to store the final result (array of objects)
  let result =[]

  //for each element in parent set
  parentSet.forEach(function (currentParent) {
    //create new parent object with properties title and data (array)
    let newParentObject = {
      title: currentParent,
      data: []
    };

    //loop through the children set and find the corresponding children for the current parent
    childrenSet.forEach(function (currentChild) {
      //if child element contains the same string as the parent element
      if (currentChild.includes(currentParent)) {
        //add children to parent object
        newParentObject.data.push(currentChild);
      }
    })

    //push the parent object to the results array
    result.push(newParentObject);
  })

  //return the array of parent-children objects
  return result;
}



describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];
  
      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];
  
      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });