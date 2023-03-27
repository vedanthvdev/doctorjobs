function JobModal({
  filteredJobs,
  openContactModal,
  openDeleteConfirmationModal,
}) {
  return (
    <ul id="all-jobs-list">
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <form className="all-jobs-available" key={job.id}>
            <div className="job-card" id={job.id}>
              <h4>{job.title}</h4>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>
                {job.job_type} {job.job_salary}
              </p>
              <div className="contact-section">
                {job.apply_link && (
                  <a href={job.apply_link} className="apply-link">
                    Apply Now
                  </a>
                )}
                {(job.contact[0].phone || job.contact[0].email) && (
                  <button
                    className="contact-button"
                    onClick={(e) => openContactModal(e, job.contact[0])}
                  >
                    Contact
                  </button>
                )}
                {openDeleteConfirmationModal && (
                  <button
                    className="deleteJob"
                    onClick={(e) => openDeleteConfirmationModal(e, job.id)}
                  >
                    <i className="fa-solid fa-trash"></i>{" "}
                  </button>
                )}
              </div>
            </div>
          </form>
        ))
      ) : (
        <form className="empty-Jobs">No jobs found</form>
      )}
    </ul>
  );
}

export default JobModal;
