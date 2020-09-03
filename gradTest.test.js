function createMenuData(data) {
  //separate the data to create one set for parents and another set for children
  let parentAndChildrenArray = createParentAndChildrenSets(data);

  //use the parent and children sets to create an array of parent-children objects
  return createParentChildrenObjectArray(parentAndChildrenArray);
}

//helper functions
function createParentAndChildrenSets(data){
  let parentSet = new Set();
  let childrenSet = new Set();

  data.forEach(function (currentValue) {
    let currentParentAndChild = currentValue.split("/");

    //if there is a child in the currentValue string
    if (currentParentAndChild.length > 1) {
      parentSet.add(currentParentAndChild[0]);
      childrenSet.add(currentParentAndChild[1]);
    }
  });

  return [parentSet, childrenSet];
}

function createParentChildrenObjectArray(parentChildrenSets){
  let parentSet = parentChildrenSets[0];
  let childrenSet = parentChildrenSets[1];
  let result =[]


  parentSet.forEach(function (currentParent) {
    let newParentObject = {
      title: currentParent,
      data: []
    };

    childrenSet.forEach(function (currentChild) {
      if (currentChild.includes(currentParent)) {
        newParentObject.data.push(currentChild);
      }
    })

    result.push(newParentObject);
  })

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