// Fetch and display resume data
fetch("./resume.json")
  .then((response) => response.json())
  .then((resume) => {
    displayBasicInfo(resume.basics);
    displayWorkExperience(resume.work);
    displayEducation(resume.education);
    displaySkills(resume.skills);
    displayLanguages(resume.languages);
  })
  .catch((error) => console.error("Error fetching resume:", error));

// Display basic information
function displayBasicInfo(basics) {
  document.title = `Mino - ${basics.name}`;
  document.getElementById("name").innerText = basics.name;
  document.getElementById("email").innerText = basics.email;
  document.getElementById("phone").innerText = basics.phone;
  document.getElementById(
    "location"
  ).innerText = `${basics.location.city}, ${basics.location.countryCode}`;
  document.getElementById("summary").innerText = basics.summary;
  document.getElementById("summary").onclick = () => {
    openModal("Edit Summary", basics.summary, (newSummary) => {
      document.getElementById("summary").innerText = newSummary;
    });
  };
}

// Display work experience
function displayWorkExperience(work) {
  const workSection = document.getElementById("work-experience");
  work.forEach((job) => {
    const workItem = createWorkItem(job);
    workSection.appendChild(workItem);
  });
}

// Create a work item element
function createWorkItem(job) {
  const workItem = document.createElement("div");
  workItem.className = "work-item";

  const company = document.createElement("div");
  company.className = "company";
  company.innerText = job.company;
  workItem.appendChild(company);

  const position = document.createElement("div");
  position.className = "position";
  position.innerText = job.position;
  workItem.appendChild(position);

  const dateRange = document.createElement("div");
  dateRange.className = "date-range";
  dateRange.innerText = `${job.startDate} - ${job.endDate || "Present"}`;
  workItem.appendChild(dateRange);

  const summary = document.createElement("p");
  summary.innerText = job.summary;
  workItem.appendChild(summary);

  if (job.highlights && job.highlights.length > 0) {
    const highlights = createHighlights(job.highlights);
    workItem.appendChild(highlights);
  }

  if (job["qualitative-story"]) {
    const storyContainer = createQualitativeStory(job["qualitative-story"]);
    workItem.appendChild(storyContainer);
  }

  return workItem;
}

// Create highlights element
function createHighlights(highlights) {
  const highlightsDiv = document.createElement("div");
  highlightsDiv.className = "highlights";
  const highlightsTitle = document.createElement("strong");
  highlightsTitle.innerText = "Highlights:";
  highlightsDiv.appendChild(highlightsTitle);

  const highlightsList = document.createElement("ul");
  highlights.forEach((highlight) => {
    const highlightItem = document.createElement("li");
    highlightItem.innerText = highlight;
    highlightsList.appendChild(highlightItem);
  });
  highlightsDiv.appendChild(highlightsList);

  return highlightsDiv;
}

// Create qualitative story element
function createQualitativeStory(storyText) {
  const storyContainer = document.createElement("div");
  storyContainer.className = "qualitative-story-container";

  const toggleLine = document.createElement("hr");
  toggleLine.className = "toggle-story";
  toggleLine.onclick = () => {
    const story = storyContainer.querySelector(".qualitative-story");
    story.style.display = story.style.display === "none" ? "block" : "none";
  };

  const story = document.createElement("div");
  story.className = "qualitative-story";
  story.innerText = storyText;
  story.style.display = "none"; // Collapsed by default
  story.onclick = () => {
    story.style.display = "none";
  };

  storyContainer.appendChild(toggleLine);
  storyContainer.appendChild(story);

  return storyContainer;
}

// Display education
function displayEducation(education) {
  const educationSection = document.getElementById("education");
  education.forEach((edu) => {
    const eduItem = createEducationItem(edu);
    educationSection.appendChild(eduItem);
  });
}

// Create an education item element
function createEducationItem(edu) {
  const eduItem = document.createElement("div");
  eduItem.className = "education-item";

  const institution = document.createElement("div");
  institution.className = "company";
  institution.innerText = edu.institution;
  eduItem.appendChild(institution);

  const studyType = document.createElement("div");
  studyType.className = "studyType";
  studyType.innerText = `${edu.studyType} in ${edu.area}`;
  eduItem.appendChild(studyType);

  const dateRange = document.createElement("div");
  dateRange.className = "date-range";
  dateRange.innerText = `${edu.startDate} - ${edu.endDate}`;
  eduItem.appendChild(dateRange);

  return eduItem;
}

// Display skills
function displaySkills(skills) {
  const skillCategories = categorizeSkills(skills);
  const skillsList = document.getElementById("skills-list");
  skillCategories.forEach(([category, skills]) => {
    const categoryItem = document.createElement("li");
    categoryItem.innerText = category;
    skillsList.appendChild(categoryItem);

    const skillSubList = document.createElement("ul");
    skills.forEach((skillName) => {
      const skillItem = document.createElement("li");
      skillItem.innerText = skillName;
      skillSubList.appendChild(skillItem);
    });
    skillsList.appendChild(skillSubList);
  });
}

// Categorize skills
function categorizeSkills(skills) {
  const skillCategories = {};
  skills.forEach((skill) => {
    if (!skillCategories[skill.category]) {
      skillCategories[skill.category] = [];
    }
    skillCategories[skill.category].push(skill.name);
  });
  return Object.keys(skillCategories).map((category) => [
    category,
    skillCategories[category],
  ]);
}

// Display languages
function displayLanguages(languages) {
  const languagesList = document.getElementById("languages-list");
  languages.forEach((lang) => {
    const langItem = document.createElement("li");
    langItem.innerText = `${lang.language} - ${lang.fluency}`;
    languagesList.appendChild(langItem);
  });
}

// Modal functionality
function openModal(title, defaultValue, onSubmit) {
  const modal = document.getElementById("modal");
  const modalTitle = modal.querySelector("h2");
  const modalInput = modal.querySelector("#modal-input");
  const modalSubmit = modal.querySelector("#modal-submit");
  const closeButton = modal.querySelector(".close-button");

  modalTitle.innerText = title;
  modalInput.value = defaultValue;

  modal.style.display = "block";

  closeButton.onclick = () => {
    modal.style.display = "none";
  };

  modalSubmit.onclick = () => {
    onSubmit(modalInput.value);
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
