fetch("./resume.json")
  .then((response) => response.json())
  .then((resume) => {
    // Display name
    document.getElementById("name").innerText = resume.basics.name;
    // Display email
    document.getElementById("email").innerText = resume.basics.email;
    //Display phone
    document.getElementById("phone").innerText = resume.basics.phone;
    // Display location
    document.getElementById(
      "location"
    ).innerText = `${resume.basics.location.city}, ${resume.basics.location.countryCode}`;

    // Display summary
    document.getElementById("summary").innerText = resume.basics.summary;

    // Display work experience
    const workSection = document.getElementById("work-experience");
    resume.work.forEach((job) => {
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
        const highlights = document.createElement("div");
        highlights.className = "highlights";
        const highlightsTitle = document.createElement("strong");
        highlightsTitle.innerText = "Highlights:";
        highlights.appendChild(highlightsTitle);

        const highlightsList = document.createElement("ul");
        job.highlights.forEach((highlight) => {
          const highlightItem = document.createElement("li");
          highlightItem.innerText = highlight;
          highlightsList.appendChild(highlightItem);
        });
        highlights.appendChild(highlightsList);
        workItem.appendChild(highlights);
      }

      if (job["qualitative-story"]) {
        const storyContainer = document.createElement("div");
        storyContainer.className = "qualitative-story-container";

        // const toggleButton = document.createElement("button");
        // toggleButton.className = "toggle-button";
        // toggleButton.innerText = "Show Story";
        const toggleLine = document.createElement("hr");
        toggleLine.className = "toggle-story";
        toggleLine.onclick = () => {
          const story = storyContainer.querySelector(".qualitative-story");
          if (story.style.display === "none") {
            story.style.display = "block";
          } else {
            story.style.display = "none";
          }
        };

        const story = document.createElement("div");
        story.className = "qualitative-story";
        story.innerText = job["qualitative-story"];
        story.style.display = "none"; // Collapsed by default
        story.onclick = () => {
          story.style.display = "none";
        };

        storyContainer.appendChild(toggleLine);
        storyContainer.appendChild(story);
        workItem.appendChild(storyContainer);
      }

      workSection.appendChild(workItem);
    });

    const educationSection = document.getElementById("education");
    resume.education.forEach((edu) => {
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

      educationSection.appendChild(eduItem);
    });

    const skillCategories = {};

    // Categorize skills
    resume.skills.forEach((skill) => {
      if (!skillCategories[skill.category]) {
        skillCategories[skill.category] = [];
      }
      skillCategories[skill.category].push(skill.name);
    });

    // Convert the object into a two-dimensional array
    const skillByCategory = Object.keys(skillCategories).map((category) => {
      return [category, skillCategories[category]];
    });

    // Display categorized skills
    const skillsList = document.getElementById("skills-list");
    skillByCategory.forEach(([category, skills]) => {
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

    // skillByCategory.forEach((category) => {
    //   const categoryItem = document.createElement("li");
    //   categoryItem.innerText = category;
    //   skillsList.appendChild(categoryItem);
    // });
    // const skillItem = document.createElement("li");
    // skillItem.innerText = skill.name;
    // skillsList.appendChild(skillItem);

    // Display languages
    const languagesList = document.getElementById("languages-list");
    resume.languages.forEach((lang) => {
      const langItem = document.createElement("li");
      langItem.innerText = `${lang.language} - ${lang.fluency}`;
      languagesList.appendChild(langItem);
    });
  })
  .catch((error) => console.error("Error fetching resume:", error));

// Display education
