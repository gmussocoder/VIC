//utils
//"generate_job_id()": Function that generates the Jobs Id.
function generate_job_id() {
  // Define the length of the job ID
  const length = 10;
  // Define the character set to choose from
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  // Generate the random job ID
  let job_id = '';
  for (let i = 0; i < length; i++) {
    job_id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return job_id;
};

module.exports = generate_job_id;