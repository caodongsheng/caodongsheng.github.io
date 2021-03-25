function initCallbacks(callbacks={}) {
  const initiatedCallback = callbacks;
  const stubCallback = ()=>{};
  initiatedCallback.allowTraversal = callbacks.allowTraversal;
  //initiatedCallback.enterNode = callbacks.enterNode || stubCallback;
  initiatedCallback.leaveNode = callbacks.leaveNode || stubCallback;
  return initiatedCallback;
}

export function depthFirstSearch(rootNode, callbacks) {
  depthFirstSearchRecursive(rootNode, initCallbacks(callbacks));
}

function depthFirstSearchRecursive(node, callbacks) {
  //callbacks.enterNode(node);
  for (let subnode of node.nodes) {
    if(callbacks.allowTraversal(subnode)){
      depthFirstSearchRecursive(subnode, callbacks);
    }else{
      break;
    }
  }
  callbacks.leaveNode(node);
}
