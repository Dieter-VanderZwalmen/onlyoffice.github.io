class NamesPlugin {
    constructor(config, api) {
      this.config = config;
      this.api = api;
      this.selectedCells = [];
  
      // create button to open modal to add category
      const addCategoryButton = document.createElement('button');
      addCategoryButton.textContent = 'Add Category';
      addCategoryButton.addEventListener('click', this.openAddCategoryModal.bind(this));
      this.api.toolbar.insertItem('add-category', addCategoryButton);
  
      // listen for cell selection changes
      this.api.events.on('cellSelectionChanged', this.onCellSelectionChanged.bind(this));
    }
  
    onCellSelectionChanged(range) {
      this.selectedCells = this.api.getSelection();
    }
  
    openAddCategoryModal() {
      const modal = this.createModal();
  
      const form = document.createElement('form');
  
      const label = document.createElement('label');
      label.textContent = 'Category Name: ';
      form.appendChild(label);
  
      const input = document.createElement('input');
      input.type = 'text';
      form.appendChild(input);
  
      const addButton = document.createElement('button');
      addButton.type = 'submit';
      addButton.textContent = 'Add';
      form.appendChild(addButton);
  
      modal.appendChild(form);
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const categoryName = input.value;
  
        // add selected cells to category
        this.api.setValue(this.selectedCells, categoryName);
  
        this.api.closePopup();
      });
  
      this.api.showPopup(modal);
    }
  
    createModal() {
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
  
      return modal;
    }
  }
  
  window.NamesPlugin = NamesPlugin;
  