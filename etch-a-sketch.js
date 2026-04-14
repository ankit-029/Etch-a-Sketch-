function createGrid(n) {
  if (n < 1 || n > 100) {
    alert(
      "No. of rows and columns should be in range [1, 100]. Falling back to default value 16.",
    );
    n = 16;
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

const gridSize = document.querySelector("#grid-size");
gridSize.addEventListener("click", () => {
  createGrid(prompt("Enter No. of rows and columns: ", 16));
});

createGrid(16);
let gridBG = getComputedStyle(
  document.querySelector("#grid-container"),
).backgroundColor;

const toggleBorder = document.querySelector("#toggle-border");
toggleBorder.addEventListener("click", () => {
  const cells = document.querySelectorAll(".grid-column");
  cells.forEach((cell) => {
    if (cell.style.borderWidth === "0px") cell.style.borderWidth = "1px";
    else cell.style.borderWidth = "0px";
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  const cells = document.querySelectorAll(".grid-column");
  cells.forEach((cell) => (cell.style.backgroundColor = gridBG));
});
