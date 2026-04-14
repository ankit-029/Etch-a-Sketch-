//Function to Create Grid of n x n size:
function createGrid(n) {
  if (n < 1 || n > 100) {
    alert(
      "No. of rows and columns should be in range [1, 100]. Falling back to default value 46.",
    );
    n = 46;
  }
  const container = document.querySelector("#grid-container");

  document.querySelectorAll(".grid-row").forEach((row) => row.remove());

  for (let i = 0; i < n; i++) {
    const gridRow = document.createElement("div");

    gridRow.classList.add("grid-row");
    gridRow.setAttribute(
      "style",
      "display: flex; flex-direction: row; flex: 1;",
    );

    for (let j = 0; j < n; j++) {
      const gridColumn = document.createElement("div");

      gridColumn.classList.add("grid-column");
      gridColumn.setAttribute("style", "flex: 1; border: 0px solid black");
      gridColumn.onmousemove = (event) => {
        event.target.style.backgroundColor = "red";
      };

      gridRow.appendChild(gridColumn);
    }

    container.appendChild(gridRow);
  }
}

//Pop-up window for custom prompt.
function createPopUp() {
  const popUpWindow = document.createElement("div");
  popUpWindow.classList.add("pop-up-window");
  const body = document.querySelector("body");
  popUpWindow.setAttribute(
    "style",
    "position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;",
  );
  body.appendChild(popUpWindow);

  const popUpBox = document.createElement("div");
  popUpBox.setAttribute(
    "style",
    "background-color: black; border: 1px solid #ff013c; padding: 20px 15px; position: static;",
  );
  popUpBox.classList.add("pop-up-box");
  popUpWindow.appendChild(popUpBox);

  const cancel = document.createElement("button");
  cancel.classList.add("cancel");
  cancel.innerText = "X";
  cancel.setAttribute(
    "style",
    "position: absolute; top: 0; right: 0; background-color: black; border: none; padding: 10px; color: white; background-color: rgba(0, 0, 0, 0);",
  );
  popUpWindow.appendChild(cancel);

  cancel.addEventListener("mouseover", () => {
    cancel.style.backgroundColor = "#ff013c";
    cancel.style.transition = "all 0.15s ease-in-out";
  });
  cancel.addEventListener("mouseleave", () => {
    cancel.style.backgroundColor = "rgba(0, 0, 0, 0)";
    cancel.style.transition = "all 0.15s ease-in-out";
  });

  const apply = document.createElement("button");
  apply.classList.add("apply");
  apply.innerText = "Apply";
  apply.setAttribute(
    "style",
    "position: absolute; top: 0; left: 0; background-color: black; border: none; padding: 10px; color: white; background-color: rgba(0, 0, 0, 0);",
  );
  popUpWindow.appendChild(apply);

  apply.addEventListener("mouseover", () => {
    apply.style.backgroundColor = "#a0d2eb";
    apply.style.transition = "all 0.15s ease-in-out";
  });
  apply.addEventListener("mouseleave", () => {
    apply.style.backgroundColor = "rgba(0, 0, 0, 0)";
    apply.style.transition = "all 0.15s ease-in-out";
  });
}

//Custom Prompt.
function createPrompt(userInstruciton) {
  return new Promise((resolve) => {
    createPopUp();
    const popUpBox = document.querySelector(".pop-up-box");
    const para = document.createElement("p");
    para.setAttribute(
      "style",
      "color: white; font-size: 10px; letter-spacing: 3px;",
    );
    para.innerText = userInstruciton;
    popUpBox.appendChild(para);

    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "number");
    inputBox.setAttribute("min", "1");
    inputBox.setAttribute("max", "100");
    inputBox.setAttribute(
      "style",
      "padding: 4px; margin-top: 5px; margin-left: 80px;",
    );
    popUpBox.appendChild(inputBox);

    const body = document.querySelector("body");
    const popUpWindow = document.querySelector(".pop-up-window");
    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", () => {
      body.removeChild(popUpWindow);
      resolve(null);
    });

    const apply = document.querySelector(".apply");
    apply.addEventListener("click", () => {
      let n = Number(inputBox.value);
      body.removeChild(popUpWindow);
      resolve(n);
    });
  });
}

//Initial size of Grid.
createGrid(46);

//Background Color of grid.
let gridBG = getComputedStyle(
  document.querySelector("#grid-container"),
).backgroundColor;

//Event to prompt user for size of grid.
const gridSize = document.querySelector("#grid-size");
gridSize.addEventListener("click", async () => {
  let n = await createPrompt("Enter No. of rows and columns: ");
  if (!n) return;
  createGrid(n);
});

//Event to toggle border of cells in grid.
const toggleBorder = document.querySelector("#toggle-border");
toggleBorder.addEventListener("click", () => {
  const cells = document.querySelectorAll(".grid-column");
  cells.forEach((cell) => {
    if (cell.style.borderWidth === "0px") cell.style.borderWidth = "1px";
    else cell.style.borderWidth = "0px";
  });
});

//Event to clean the grid to its initial state.
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  const cells = document.querySelectorAll(".grid-column");
  cells.forEach((cell) => (cell.style.backgroundColor = gridBG));
});
