function createMenuData(data) {
  //create parent and child sets
  let parentSet = new Set();
  let childSet = new Set();
  let resultSet = [];

//loop through each element in data
  data.forEach(function (currentValue) {
    //split current string by / and store in array
    var currentParentAndChild = currentValue.split("/");

    //store first value in parentArray and second value in childArray
    //only if there is a child in the currentValue string
    if (currentParentAndChild.length > 1) {
      parentSet.add(currentParentAndChild[0]);
      childSet.add(currentParentAndChild[1]);
    }

  });

  parentSet.forEach(function (currentParent) {
    var newParentObject = {
      title: currentParent,
      data: []
    }

    childSet.forEach(function (currentChild) {
      if (currentChild.includes(currentParent)) {
        newParentObject.data.push(currentChild);
      }
    })

    resultSet.push(newParentObject);

  })

  return resultSet;
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