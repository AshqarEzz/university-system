// Connect to MetaMask
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' });

    const contractAddress = '0x799f065103f7fC5dE1A5549bF02e12b1C6d0dF83'; // Your contract address
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "addBachelorStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "addMasterStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "addPhDStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "department",
                    "type": "string"
                }
            ],
            "name": "addProfessor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getBachelorStudents",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMasterStudents",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPhDStudents",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getProfessors",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUniversityDetails",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "university",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "owner",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "dean",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const universityContract = new web3.eth.Contract(contractABI, contractAddress);

    document.getElementById('addStudentBtn').onclick = async () => {
        const name = document.getElementById('studentName').value;
        const age = parseInt(document.getElementById('studentAge').value);
        const role = document.getElementById('studentRole').value;

        const accounts = await web3.eth.getAccounts();
        
        try {
            await universityContract.methods[`add${role}Student`](name, age).send({ from: accounts[0] });
            alert(`${role} student added successfully!`);
            refreshStudentList();
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Error adding student. Check console for details.");
        }
    };

    document.getElementById('addProfessorBtn').onclick = async () => {
        const name = document.getElementById('professorName').value;
        const age = parseInt(document.getElementById('professorAge').value);
        const department = document.getElementById('professorDepartment').value;

        const accounts = await web3.eth.getAccounts();
        
        try {
            await universityContract.methods.addProfessor(name, age, department).send({ from: accounts[0] });
            alert("Professor added successfully!");
            refreshProfessorList();
        } catch (error) {
            console.error("Error adding professor:", error);
            alert("Error adding professor. Check console for details.");
        }
    };

    async function refreshStudentList() {
        const phdStudents = await universityContract.methods.getPhDStudents().call();
        const masterStudents = await universityContract.methods.getMasterStudents().call();
        const bachelorStudents = await universityContract.methods.getBachelorStudents().call();

        document.getElementById('studentList').innerText = `
PhD Students:
${phdStudents}

Master's Students:
${masterStudents}

Bachelor's Students:
${bachelorStudents}
        `;
    }

    async function refreshProfessorList() {
        const professors = await universityContract.methods.getProfessors().call();
        document.getElementById('professorList').innerText = `Professors:\n${professors}`;
    }

    async function refreshUniversityDetails() {
        const details = await universityContract.methods.getUniversityDetails().call();
        document.getElementById('universityDetails').innerText = `
Name: ${details[0]}
Location: ${details[1]}
Owner: ${details[2]}
Dean: ${details[3]}
        `;
    }

    // Initial load
    refreshStudentList();
    refreshProfessorList();
    refreshUniversityDetails();
} else {
    alert('MetaMask is not installed. Please install it to use this app.');
}