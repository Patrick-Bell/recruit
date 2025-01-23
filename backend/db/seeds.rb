# db/seeds.rb

Job.create!([
  {
    job_title: 'Senior Software Engineer',
    job_type: 'Full-Time',  # Permanent job
    lower_salary: 90000,
    higher_salary: 120000,
    lower_rate: nil,        # Leave null for permanent jobs
    higher_rate: nil,       # Leave null for permanent jobs
    contract_determine: 'Permanent',
    job_location: 'New York, NY',
    job_hybrid: 'Hybrid',
    job_desc: 'We are seeking a talented Software Engineer to join our growing engineering team. As a Software Engineer at Tech Innovators, you will be responsible for designing, developing, and maintaining high-quality software applications. You will work with a team of experienced engineers, product managers, and designers to build scalable, reliable, and secure solutions that meet the needs of our clients.

This position offers a unique opportunity to contribute to the development of cutting-edge software while continuously enhancing your skills in a collaborative and fast-paced environment. You will have the chance to work on exciting projects that make a difference, from backend systems to front-end applications and everything in between.',
    job_skills: ['Ruby on Rails', 'React', 'PostgreSQL', 'AWS'],
    job_benefits: ['Health Insurance', '401(k)', 'Remote Work Options'],
    tag: true,
    job_posted: Date.today - 10,
    job_close: Date.today + 20,
    active: true
  },
  {
    job_title: 'Project Manager',
    job_type: 'Contract',  # Contract job
    lower_salary: nil,     # Leave null for contract jobs
    higher_salary: nil,    # Leave null for contract jobs
    lower_rate: 500,
    higher_rate: 700,
    contract_determine: '6 months',
    job_location: 'San Francisco, CA',
    job_hybrid: 'Onsite',
    job_desc: 'Manage software development projects and coordinate team activities.',
    job_skills: ['Agile Methodologies', 'JIRA', 'Team Management'],
    job_benefits: ['Flexible Hours'],
    tag: false,
    job_posted: Date.today - 5,
    job_close: Date.today + 25,
    active: true
  },
  {
    job_title: 'Junior Developer',
    job_type: 'Part-Time',  # Permanent job
    lower_salary: 40000,
    higher_salary: 60000,
    lower_rate: nil,        # Leave null for permanent jobs
    higher_rate: nil,       # Leave null for permanent jobs
    contract_determine: 'Temporary',
    job_location: 'Remote',
    job_hybrid: 'Remote',
    job_desc: 'Assist in developing and testing software applications.',
    job_skills: ['JavaScript', 'HTML', 'CSS'],
    job_benefits: ['Training Programs', 'Mentorship'],
    tag: false,
    job_posted: Date.today - 3,
    job_close: Date.today + 15,
    active: true
  },
  {
    job_title: 'Data Analyst',
    job_type: 'Full-Time',  # Permanent job
    lower_salary: 70000,
    higher_salary: 90000,
    lower_rate: nil,        # Leave null for permanent jobs
    higher_rate: nil,       # Leave null for permanent jobs
    contract_determine: 'Permanent',
    job_location: 'Chicago, IL',
    job_hybrid: 'Hybrid',
    job_desc: 'Analyze business data to provide insights and recommendations.',
    job_skills: ['SQL', 'Python', 'Data Visualization'],
    job_benefits: ['Remote Work Options', 'Health Insurance'],
    tag: true,
    job_posted: Date.today - 7,
    job_close: Date.today + 30,
    active: true
  }
])
