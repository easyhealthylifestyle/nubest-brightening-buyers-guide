/* Label Check: counts confirmed label points and turns every
   unticked point into a question to ask the brand. */

(function () {
  "use strict";

  var boxes = Array.prototype.slice.call(document.querySelectorAll(".label-card input[type='checkbox']"));
  var fill = document.getElementById("meter-fill");
  var countEl = document.getElementById("confirmed");
  var listEl = document.getElementById("questions");
  var box = document.getElementById("questions-box");
  var clearBtn = document.getElementById("clear");
  if (!boxes.length) return;

  function update() {
    var done = 0;
    listEl.innerHTML = "";

    boxes.forEach(function (b) {
      var label = b.closest("label");
      if (b.checked) {
        done++;
        label.classList.add("is-on");
      } else {
        label.classList.remove("is-on");
        var li = document.createElement("li");
        li.textContent = b.getAttribute("data-q");
        listEl.appendChild(li);
      }
    });

    countEl.textContent = done;
    fill.style.width = (done / boxes.length) * 100 + "%";

    if (done === boxes.length) {
      var li = document.createElement("li");
      li.textContent = "All ten points confirmed. Check with your doctor or pharmacist if you are pregnant, breastfeeding or take medication.";
      listEl.appendChild(li);
      box.classList.add("done");
    } else {
      box.classList.remove("done");
    }
  }

  boxes.forEach(function (b) { b.addEventListener("change", update); });
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      boxes.forEach(function (b) { b.checked = false; });
      update();
    });
  }

  update();
})();
