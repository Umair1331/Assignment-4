let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn'


let totalCount = document.getElementById('totalCount');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');
let availableCount = document.getElementById('availableCount');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardsSection = document.getElementById('allCards');

const mainContainer = document.querySelector('main');

const filteredSection = document.getElementById('filtered-section')


function calculateCount() {

    const total = allCardsSection.children.length

    totalCount.innerText = total
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length

    if (currentStatus === 'interview-filter-btn') {
        availableCount.innerText = `${interviewList.length} of ${total} jobs`
    } else if (currentStatus === 'rejected-filter-btn') {
        availableCount.innerText = `${rejectedList.length} of ${total} jobs`
    } else {
        availableCount.innerText = `${total} of ${total} jobs`
    }
}

calculateCount()


function toggleStyle(id) {

    currentStatus = id

    allFilterBtn.classList.remove('bg-blue-600', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-600', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-600', 'text-white');

    allFilterBtn.classList.add('bg-white', 'text-slate-500');
    interviewFilterBtn.classList.add('bg-white', 'text-slate-500');
    rejectedFilterBtn.classList.add('bg-white', 'text-slate-500');

    const selected = document.getElementById(id)
    selected.classList.remove('bg-white', 'text-slate-500')
    selected.classList.add('bg-blue-600', 'text-white')

    if (id == 'interview-filter-btn') {
        allCardsSection.classList.add('hidden');
        filteredSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardsSection.classList.remove('hidden');
        filteredSection.classList.add('hidden')
    }
    else if (id == 'rejected-filter-btn') {
        allCardsSection.classList.add('hidden');
        filteredSection.classList.remove('hidden')
        renderRejected()
    }

    calculateCount()
}


mainContainer.addEventListener('click', function (event) {

    const card = event.target.closest('.card');
    if (!card) return;

    const company = card.querySelector('.company').innerText;
    const jobType = card.querySelector('.jobType').innerText;
    const jobDetails = card.querySelector('.jobDetails').innerText;
    const notes = card.querySelector('.notes').innerText;

    // interview
    if (event.target.classList.contains('interview-btn')) {

        card.querySelector('.status').innerText = 'Interview';

        const cardInfo = { company, jobType, jobDetails, status: 'Interview', notes };

        if (!interviewList.find(item => item.company === company)) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.company !== company);

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }
        else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
    }

    // Rejected
    else if (event.target.classList.contains('rejected-btn')) {

        card.querySelector('.status').innerText = 'Rejected';

        const cardInfo = { company, jobType, jobDetails, status: 'Rejected', notes };

        if (!rejectedList.find(item => item.company === company)) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.company !== company);

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }
        else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
    }

    // delete
    else if (event.target.closest('.btn-delete')) {

        card.remove();

        interviewList = interviewList.filter(item => item.company !== company);
        rejectedList = rejectedList.filter(item => item.company !== company);

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }
        else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
    }

    calculateCount();
});


function renderInterview() {

    filteredSection.innerHTML = ''

    if (interviewList.length === 0) {
        filteredSection.innerHTML = `
      <div class=" text-center flex flex-col items-center rounded shadow-xl flex flex-col item-center p-10">
        <img src="B13-A4-PH-Job-Tracker/jobs.png" alt="" class="w-25 mb-6  ">
        <p class="text-xl font-semibold text-gray-800">
            No jobs available
        </p>
         <p class="text-gray-600">
           Check back soon for new job opportunities
        </p>
        </div>
        `
        return;
    }

    interviewList.forEach(interview => {

        let div = document.createElement('div')
        div.className = 'card flex justify-between bg-white p-8 rounded shadow-xl'
        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <p class="company text-blue-950 font-semibold text-2xl">${interview.company}</p>
                    <p class="jobType text-slate-500 ">${interview.jobType}</p>
                </div>

                <div>
                    <p class="jobDetails text-slate-500">${interview.jobDetails}</p>
                </div>

                <p class="status bg-green-100 text-green-700 font-semibold px-3 py-1 rounded w-fit">
                    ${interview.status}
                </p>

                <p class="notes">${interview.notes}</p>
                <div class="flex gap-4">
            <button class="interview-btn font-semibold text-green-600 border px-3 py-2 rounded hover:bg-green-600 cursor-pointer transition-all hover:text-white">INTERVIEW</button>
            <button class="rejected-btn font-semibold text-red-600 border px-3 py-2 rounded hover:bg-red-600 cursor-pointer transition-all hover:text-white">REJECTED</button>
          </div>
        </div>
                
            </div>

              
          <div class="">   
          <button class="btn-delete text-gray-500 hover:text-red-600 transition text-lg">
            <i class="fa-regular fa-trash-can"></i></button>          
        </div>
        `
        filteredSection.appendChild(div)
    })
}


function renderRejected() {

    filteredSection.innerHTML = ''

    if (rejectedList.length === 0) {
        filteredSection.innerHTML = `
            <div class=" text-center flex flex-col items-center rounded shadow-xl flex flex-col item-center p-10">
           <img src="B13-A4-PH-Job-Tracker/jobs.png" alt="" class="w-25 mb-6  ">
                <p class="text-xl font-semibold text-gray-800">
                    No jobs available
                </p>
                <p class="text-gray-600">
                 Check back soon for new job opportunities
                </p>
            </div>
        `
        return;
    }

    rejectedList.forEach(rejected => {

        let div = document.createElement('div')
        div.className = 'card flex justify-between bg-white p-8 rounded shadow-xl'
        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <p class="company text-blue-950 font-semibold text-2xl">${rejected.company}</p>
                    <p class="jobType text-slate-500 ">${rejected.jobType}</p>
                </div>

                <div>
                    <p class="jobDetails text-slate-500">${rejected.jobDetails}</p>
                </div>

                <p class="status bg-red-100 text-red-700 font-semibold px-3 py-1 rounded w-fit">
                    ${rejected.status}
                </p>
                <p class="notes">${rejected.notes}</p>

                <div class="flex gap-4">
            <button class="interview-btn font-semibold text-green-600 border px-3 py-2 rounded hover:bg-green-600 cursor-pointer transition-all hover:text-white">INTERVIEW</button>
            <button class="rejected-btn font-semibold text-red-600 border px-3 py-2 rounded hover:bg-red-600 cursor-pointer transition-all hover:text-white">REJECTED</button>
          </div>
        </div>
               
            </div>
            

            <div class="">   
          <button class="btn-delete text-gray-500 hover:text-red-600 transition text-lg">
            <i class="fa-regular fa-trash-can"></i></button>      
        </div>
        `
        filteredSection.appendChild(div)
    })
}