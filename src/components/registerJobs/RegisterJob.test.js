import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import RegisterJob from "./RegisterJob";
import ViewMyJobs from "./ViewMyJobs";
import JobModal from "../jobs/jobModal";

jest.mock("axios");

describe("RegisterJob component", () => {
  it("should render the component without errors", () => {
    render(<RegisterJob />);
    const title = screen.getByText("Add Job");
    expect(title).toBeInTheDocument();
  });

  it("should update state when user types into inputs", () => {
    render(<RegisterJob />);
    const jobTitleInput = screen.getByPlaceholderText("Job Title*");
    fireEvent.change(jobTitleInput, { target: { value: "Software Engineer" } });
    expect(jobTitleInput.value).toBe("Software Engineer");
  });

  it("should make an API call when user submits the form", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    render(<RegisterJob />);
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });
});

describe("ViewMyJobs", () => {
  beforeEach(() => {
    axios.post.mockResolvedValueOnce({
      data: [
        {
          j_id: 1,
          j_title: "Surgeon",
          j_company: "Google",
          j_location: "Mountain View, CA",
          j_type: "Full-time",
          j_salary: "1500000",
          j_link: "https://www.google.com/careers",
          j_contact: '[{"phone": "1234567890", "email": "hr@google.com"}]',
        },
      ],
    });
    window.localStorage.setItem("userId", "1");
  });

  afterEach(() => {
    window.localStorage.removeItem("userId");
  });

  it("renders job list after fetching jobs", async () => {
    render(<ViewMyJobs />);
    const jobList = await screen.findByTestId("job-list");
    expect(jobList).toBeInTheDocument();
  });

  it("opens delete confirmation modal when delete button is clicked", async () => {
    render(<ViewMyJobs />);
    const deleteButton = await screen.findByTestId("delete-job");
    fireEvent.click(deleteButton);
    const modal = await screen.findByText("Confirm Deleting the job");
    expect(modal).toBeInTheDocument();
  });
});

describe("JobModal", () => {
  it("renders job details", () => {
    const jobs = [
      {
        j_id: 1,
        j_title: "Dentist",
        j_company: "Google",
        j_location: "View, CA",
        j_type: "Part-time",
        j_salary: "200000",
        j_link: "https://www.google.com/careers",
        j_contact: '[{"phone": "1234567890", "email": "hr@google.com"}]',
      },
    ];
    render(<JobModal filteredJobs={jobs} />);
    const jobTitle = screen.getByText("Dentist");
    const jobCompany = screen.getByText("Google");
    const jobLocation = screen.getByText("View, CA");
    const jobTypeAndSalary = screen.getByText("Part-time 200000");
    expect(jobTitle).toBeInTheDocument();
    expect(jobCompany).toBeInTheDocument();
    expect(jobLocation).toBeInTheDocument();
    expect(jobTypeAndSalary).toBeInTheDocument();
  });

  it("opens contact modal when contact button is clicked", () => {
    const jobs = [
      {
        j_id: 1,
        j_title: "Software Engineer",
        j_company: "Google",
        j_location: "Mountain View, CA",
        j_type: "Full-time",
        j_salary: "$150k-$200k",
        j_link: "https://www.google.com/careers",
        j_contact: '[{"phone": "1234567890", "email": "hr@google.com"}]',
      },
    ];
    render(<JobModal filteredJobs={jobs} />);
    const contactButton = screen.getByText("Contact");
    fireEvent.click(contactButton);
    const modal = screen.getByTestId("modal-overlay");
    expect(modal).toBeInTheDocument();
  });
});
