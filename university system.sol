// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UniversitySystem {
    struct Class {
        string name;
        string score; // A, B, C, D, F
    }

    struct Student {
        string name;
        uint age;
        string role; // PhD, Master's, Bachelor's
        Class[] classes; // List of classes and scores
    }

    struct Professor {
        string name;
        uint age;
        string department;
        Class[] classes; // List of classes taught
    }



    struct University {
        string name;
        string location;
        string owner;
        string dean;
        Student[] phdStudents;
        Student[] masterStudents;
        Student[] bachelorStudents;
        Professor[] professors;
    }

    University public university;

    constructor() {
        university.name = "Atlas University";
        university.location = "Kagithane Istanbul";
        university.owner = "Engin Gulal";
        university.dean = "Dr. Alice Smith";
    }

    // Public functions to add students and professors
    function addPhDStudent(string memory name, uint age) public {
        Student storage newStudent = university.phdStudents.push();
        newStudent.name = name;
        newStudent.age = age;
        newStudent.role = "PhD";
        newStudent.classes.push(Class("Algorithms", "A"));
        newStudent.classes.push(Class("Data Structures", "B+"));
    }

    function addMasterStudent(string memory name, uint age) public {
        Student storage newStudent = university.masterStudents.push();
        newStudent.name = name;
        newStudent.age = age;
        newStudent.role = "Master's";
        newStudent.classes.push(Class("Machine Learning", "A-"));
        newStudent.classes.push(Class("Statistics", "B"));
    }

    function addBachelorStudent(string memory name, uint age) public {
        Student storage newStudent = university.bachelorStudents.push();
        newStudent.name = name;
        newStudent.age = age;
        newStudent.role = "Bachelor's";
        newStudent.classes.push(Class("Introduction to Programming", "B+"));
        newStudent.classes.push(Class("Web Development", "A"));
    }

    function addProfessor(string memory name, uint age, string memory department) public {
        Professor storage newProfessor = university.professors.push();
        newProfessor.name = name;
        newProfessor.age = age;
        newProfessor.department = department;
        newProfessor.classes.push(Class("Algorithms", "3")); // Assuming "3" is credits
    }

    function getUniversityDetails() public view returns (string memory, string memory, string memory, string memory) {
        return (university.name, university.location, university.owner, university.dean);
    }

    function getPhDStudents() public view returns (string memory) {
        return formatStudentList(university.phdStudents);
    }

    function getMasterStudents() public view returns (string memory) {
        return formatStudentList(university.masterStudents);
    }

    function getBachelorStudents() public view returns (string memory) {
        return formatStudentList(university.bachelorStudents);
    }

    function getProfessors() public view returns (string memory) {
        return formatProfessorList(university.professors);
    }

    // Helper functions for formatting
    function formatStudentList(Student[] memory students) internal pure returns (string memory) {
        string memory result;
        for (uint i = 0; i < students.length; i++) {
            result = string(abi.encodePacked(result, students[i].name, ", ", uint2str(students[i].age), ", ", students[i].role, "\nClasses: "));
            for (uint j = 0; j < students[i].classes.length; j++) {
                result = string(abi.encodePacked(result, students[i].classes[j].name, " (Score: ", students[i].classes[j].score, "), "));
            }
            result = string(abi.encodePacked(result, "\n\n"));
        }
        return result;
    }

    function formatProfessorList(Professor[] memory professors) internal pure returns (string memory) {
        string memory result;
        for (uint i = 0; i < professors.length; i++) {
            result = string(abi.encodePacked(result, professors[i].name, ", ", uint2str(professors[i].age), ", ", professors[i].department, "\nClasses: "));
            for (uint j = 0; j < professors[i].classes.length; j++) {
                result = string(abi.encodePacked(result, professors[i].classes[j].name, " (Credits: ", professors[i].classes[j].score, "), "));
            }
            result = string(abi.encodePacked(result, "\n\n"));
        }
        return result;
    }

    function uint2str(uint _i) internal pure returns (string memory str) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        return string(bstr);
    }
}
