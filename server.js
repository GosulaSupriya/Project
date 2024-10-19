const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public1'));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public1', 'index.html'));
});

// Sample data (with domain-specific scores for each student)
const students = [
    { StudentID: 1, name: 'Alice', batch: '2020', CGPA: 9.0, CoreEngineeringPerformance: 8.5, Consistency: 9.0, HackathonsParticipated: 5, HackathonPerformance: 8.0, PaperPresentations: 2, PaperPresentationQuality: 8.5, TeacherAssistance: 7.0 },
    { StudentID: 2, name: 'Bob', batch: '2020', CGPA: 8.0, CoreEngineeringPerformance: 7.5, Consistency: 8.0, HackathonsParticipated: 4, HackathonPerformance: 7.5, PaperPresentations: 1, PaperPresentationQuality: 7.0, TeacherAssistance: 7.5 },
    { StudentID: 3, name: 'Carol', batch: '2020', CGPA: 9.2, CoreEngineeringPerformance: 8.7, Consistency: 9.3, HackathonsParticipated: 3, HackathonPerformance: 9.0, PaperPresentations: 2, PaperPresentationQuality: 8.9, TeacherAssistance: 8.0 },
    { StudentID: 4, name: 'David', batch: '2021', CGPA: 9.5, CoreEngineeringPerformance: 9.3, Consistency: 8.7, HackathonsParticipated: 6, HackathonPerformance: 9.2, PaperPresentations: 3, PaperPresentationQuality: 9.0, TeacherAssistance: 8.7 },
    { StudentID: 5, name: 'Eva', batch: '2021', CGPA: 9.8, CoreEngineeringPerformance: 9.5, Consistency: 9.0, HackathonsParticipated: 7, HackathonPerformance: 9.5, PaperPresentations: 4, PaperPresentationQuality: 9.8, TeacherAssistance: 9.0 },
    { StudentID: 6, name: 'Frank', batch: '2022', CGPA: 9.1, CoreEngineeringPerformance: 8.8, Consistency: 9.1, HackathonsParticipated: 5, HackathonPerformance: 8.3, PaperPresentations: 2, PaperPresentationQuality: 8.2, TeacherAssistance: 7.5 },
    { StudentID: 7, name: 'Grace', batch: '2022', CGPA: 9.6, CoreEngineeringPerformance: 9.1, Consistency: 9.6, HackathonsParticipated: 8, HackathonPerformance: 9.0, PaperPresentations: 3, PaperPresentationQuality: 9.5, TeacherAssistance: 8.9 },
    { StudentID: 8, name: 'Heidi', batch: '2023', CGPA: 8.9, CoreEngineeringPerformance: 8.5, Consistency: 8.7, HackathonsParticipated: 2, HackathonPerformance: 8.0, PaperPresentations: 1, PaperPresentationQuality: 7.5, TeacherAssistance: 6.5 },
    { StudentID: 9, name: 'Ivan', batch: '2023', CGPA: 9.0, CoreEngineeringPerformance: 8.9, Consistency: 9.1, HackathonsParticipated: 4, HackathonPerformance: 9.0, PaperPresentations: 2, PaperPresentationQuality: 8.5, TeacherAssistance: 7.5 },
    { StudentID: 10, name: 'Judy', batch: '2024', CGPA: 9.3, CoreEngineeringPerformance: 9.0, Consistency: 9.4, HackathonsParticipated: 3, HackathonPerformance: 8.8, PaperPresentations: 3, PaperPresentationQuality: 9.0, TeacherAssistance: 7.0 }
];

// Endpoint to get batches
app.get('/api/batches', (req, res) => {
    const batches = [
        { id: '2020', name: 'Batch 2020' },
        { id: '2021', name: 'Batch 2021' },
        { id: '2022', name: 'Batch 2022' },
        { id: '2023', name: 'Batch 2023' },
        { id: '2024', name: 'Batch 2024' },
        { id: '2025', name: 'Batch 2025' }
    ];
    res.json({ batches });
});

// Endpoint to get top students for a selected batch
app.get('/api/top-students', (req, res) => {
    const selectedBatch = req.query.batch;
    const filteredStudents = students.filter(student => student.batch === selectedBatch);
    const totalScores = filteredStudents.map(student => ({
        name: student.name,
        totalScore: (student.CGPA + student.CoreEngineeringPerformance + student.Consistency + student.HackathonsParticipated + student.HackathonPerformance + student.PaperPresentations + student.PaperPresentationQuality + student.TeacherAssistance) / 8
    }));

    // Sort students by totalScore
    totalScores.sort((a, b) => b.totalScore - a.totalScore);

    res.json({ students: totalScores });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
