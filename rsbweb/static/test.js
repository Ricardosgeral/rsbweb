function addChild(obj) {
  if (obj.children) {
    obj.children.forEach(child => {
      if (!child.children) {
        child.children = [];
      } else {
        addChild(child);
      }
    });
  }else{

    obj.children=[];
    addChild(obj);
  }
}


function iterate_json(obj) {
    obj.children.forEach(child => {
      if (!child.children) {
        ;
      } else {
        iterate_json(child);
      }
    });
}