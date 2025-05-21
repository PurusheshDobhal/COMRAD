function semanticAnalyzer(tree) {
    const symbolTable = new Map();
  
    function annotate(node) {
      if (!node) return null;
      const newNode = { ...node };
      if (node.children) {
        newNode.children = node.children.map(annotate);
      }
      if (node.label === 'Declaration') {
        const varName = node.children[1].label;
        const exprNode = node.children[3];
        symbolTable.set(varName, evaluate(exprNode));
        newNode.label += ` (declares ${varName})`;
      }
      return newNode;
    }
  
    function evaluate(node) {
      if (!node) return 0;
      if (!node.children) return isNaN(Number(node.label)) ? (symbolTable.get(node.label) ?? 0) : Number(node.label);
      const [left, right] = node.children;
      switch (node.label) {
        case '+': return evaluate(left) + evaluate(right);
        case '-': return evaluate(left) - evaluate(right);
        case '*': return evaluate(left) * evaluate(right);
        case '/': return evaluate(left) / evaluate(right);
      }
      return 0;
    }
  
    return annotate(tree);
  }
  