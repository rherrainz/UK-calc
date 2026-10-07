"use strict";

const GRADE_GROUPS = Object.freeze({
  activities: Object.freeze(["act1", "act2", "act3", "act4"]),
  forums: Object.freeze(["for1", "for2", "for3", "for4"]),
  exams: Object.freeze(["parc1", "parc2"])
});

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function hasAtLeast(values, threshold, required) {
  return values.filter((value) => value >= threshold).length >= required;
}

function isValidGrade(value) {
  return Number.isFinite(value) && value >= 0 && value <= 100;
}

function meetsConditions(activities, forums, exams, finalGrade, threshold) {
  return (
    finalGrade >= threshold &&
    hasAtLeast(activities, threshold, 3) &&
    hasAtLeast(forums, threshold, 3) &&
    exams.every((value) => value >= threshold)
  );
}

function getCondition(activities, forums, exams, finalGrade) {
  if (meetsConditions(activities, forums, exams, finalGrade, 70)) {
    return Object.freeze({ label: "Promocionado", className: "promocionado" });
  }

  if (meetsConditions(activities, forums, exams, finalGrade, 40)) {
    return Object.freeze({ label: "Regular", className: "regular" });
  }

  return Object.freeze({ label: "Libre", className: "libre" });
}

function calculateGrades(activities, forums, exams) {
  const activitiesAverage = average(activities);
  const forumsAverage = average(forums);
  const examsAverage = average(exams);
  const finalGrade = activitiesAverage * 0.3 + forumsAverage * 0.2 + examsAverage * 0.5;

  return Object.freeze({
    activitiesAverage,
    forumsAverage,
    examsAverage,
    finalGrade,
    condition: getCondition(activities, forums, exams, finalGrade)
  });
}

function formatGrade(value) {
  const normalized = Number(value.toFixed(10));
  const truncated = Math.floor(normalized * 1000) / 1000;

  return truncated.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3
  });
}

function initCalculator() {
  const form = document.getElementById("calculator");
  const result = document.getElementById("result");
  const resultStatus = document.getElementById("result-status");
  const errorMessage = document.getElementById("error-message");
  const allInputIds = Object.values(GRADE_GROUPS).flat();
  const inputs = allInputIds.map((id) => document.getElementById(id));

  function parseInput(input) {
    const rawValue = input.value.trim();
    return rawValue === "" ? 0 : Number(rawValue);
  }

  function readGroup(ids) {
    return ids.map((id) => parseInput(document.getElementById(id)));
  }

  function validateInputs() {
    let firstInvalidInput = null;

    inputs.forEach((input) => {
      const inputIsValid = isValidGrade(parseInput(input));
      input.setAttribute("aria-invalid", String(!inputIsValid));

      if (!inputIsValid && firstInvalidInput === null) {
        firstInvalidInput = input;
      }
    });

    return firstInvalidInput;
  }

  function clearError() {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
  }

  function showError(firstInvalidInput) {
    errorMessage.textContent =
      "Revisá las calificaciones: todos los valores deben estar entre 0 y 100.";
    errorMessage.hidden = false;
    result.hidden = true;
    firstInvalidInput.focus();
  }

  function renderResult(calculation) {
    resultStatus.className = `result-status ${calculation.condition.className}`;
    document.getElementById("result-condition").textContent = calculation.condition.label;
    document.getElementById("final-grade").textContent = formatGrade(calculation.finalGrade);
    document.getElementById("activities-average").textContent = formatGrade(
      calculation.activitiesAverage
    );
    document.getElementById("forums-average").textContent = formatGrade(
      calculation.forumsAverage
    );
    document.getElementById("exams-average").textContent = formatGrade(
      calculation.examsAverage
    );
    result.hidden = false;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    result.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstInvalidInput = validateInputs();

    if (firstInvalidInput !== null) {
      showError(firstInvalidInput);
      return;
    }

    clearError();
    const activities = readGroup(GRADE_GROUPS.activities);
    const forums = readGroup(GRADE_GROUPS.forums);
    const exams = readGroup(GRADE_GROUPS.exams);
    renderResult(calculateGrades(activities, forums, exams));
  });

  form.addEventListener("reset", () => {
    inputs.forEach((input) => input.removeAttribute("aria-invalid"));
    clearError();
    result.hidden = true;
    window.requestAnimationFrame(() => inputs[0].focus());
  });

  inputs.forEach((input) => {
    input.setAttribute("aria-describedby", "grade-help error-message");
    input.addEventListener("input", () => {
      if (isValidGrade(parseInput(input))) {
        input.removeAttribute("aria-invalid");
      }
    });
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initCalculator, { once: true });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    average,
    isValidGrade,
    meetsConditions,
    getCondition,
    calculateGrades,
    formatGrade
  };
}
