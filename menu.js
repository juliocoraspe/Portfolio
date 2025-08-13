class RoleMenu {
  constructor() {
    console.log("RoleMenu initialized! 🚀");
    this.roleButtons = document.querySelectorAll(".role-button");
    this.init();
  }

  init() {
    this.roleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openMenu(button);
      });

      // Prevent submenu clicks from closing the menu
      const submenu = button.querySelector(".submenu");
      submenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      // Add click handlers for submenu items
      const submenuItems = button.querySelectorAll(".submenu-item");
      submenuItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          this.handleSubmenuItemClick(item);
        });
      });
    });

    // Close all menus when clicking outside
    document.addEventListener("click", () => {
      this.closeAllMenus();
    });
  }

  openMenu(button) {
    // Toggle the active state of the clicked button
    const isActive = button.classList.contains("active");

    if (isActive) {
      // If already active, close this menu
      button.classList.remove("active");
    } else {
      // If not active, open this menu
      button.classList.add("active");
    }

    // Note: We're allowing multiple menus to be open at the same time
    // as requested in the requirements
  }

  closeAllMenus() {
    this.roleButtons.forEach((button) => {
      button.classList.remove("active");
    });
  }

  handleSubmenuItemClick(item) {
    console.log("Submenu item clicked:", item.textContent);
    // Add your custom logic here for handling submenu item clicks
  }
}

export default RoleMenu;
