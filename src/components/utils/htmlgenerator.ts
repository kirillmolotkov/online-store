function htmlGenerator(temlplate: string, appendTarget: HTMLElement, replace:HTMLElement|null = null) {
  const itemLayout = document.createElement('div');
  itemLayout.innerHTML = temlplate;
  const fragment: DocumentFragment = document.createDocumentFragment();
  while (itemLayout.childNodes[0]) {
    fragment.append(itemLayout.childNodes[0]);
  }
if (!replace)
    appendTarget.append(fragment);
  else appendTarget.replaceChild(fragment, replace)
}

export default htmlGenerator;