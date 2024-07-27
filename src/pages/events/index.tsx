// src/pages/Events.tsx

import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import EventCard from '@/components/EventCard';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import 'bootstrap-icons/font/bootstrap-icons.css';

import toast, { Toaster } from 'react-hot-toast';

import eventsData, { Event } from '../../data/event';
import { useRouter } from 'next/router';

import useStore from "@/data/store"; // Obtain store created with Zustand

const Events: React.FC = () => {

  const session = useStore(state => state.session);

  const router = useRouter()

  const [eventsView, setEventsView] = useState<boolean>(true) // True for Grid view, False for List View
  const handleViewChange = (evt: any, viewType: boolean) => {
    setEventsView(viewType)
  }

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [searchText, setSearchText] = useState<string>('')
  const [searchDate, setSearchDate] = useState<string>('')

  const [page, setPage] = useState<number>(1)

  const [eventsPerPage, setEventsPerPage] = useState<string>('5')

  const startIndex = (page - 1) * Number(eventsPerPage);
  const endIndex = page * Number(eventsPerPage)

  const [events, setEvents] = useState<Event[]>(eventsData.slice(startIndex, endIndex))
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchText.toLowerCase()) ||
    event.tagline.toLowerCase().includes(searchText.toLowerCase()) ||
    event.fromDate === (searchDate) ||
    event.toDate === (searchDate)
  )
  let totalPages = Math.ceil(events.length / Number(eventsPerPage))

  const [nameValueModal, setNameValueModal] = useState<string>("");
  const [taglineValueModal, setTaglineValueModal] = useState<string>("");
  const [descValueModal, setDescValueModal] = useState<string>("");
  const [fromDateValueModal, setFromDateValueModal] = useState<string>("");
  const [toDateValueModal, setToDateValueModal] = useState<string>("");
  const [locationValueModal, setLocationValueModal] = useState<string>("");
  const [imageValueModal, setImageValueModal] = useState<string>(`https://picsum.photos/800/600?random=8`);
  const [hostValueModal, setHostValueModal] = useState<string>("");
  const [websiteValueModal, setWebsiteValueModal] = useState<string>("");

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const handleAddEvent = (evt: any) => {
    evt.preventDefault()

    setIsFormSubmitting(true)

    // Simulate form submission processing
    setTimeout(() => {
      // Set button to normal state
      setIsFormSubmitting(false)

      // Add New Event to Data Array
      let eventObj = {
        "id": 23,
        "name": nameValueModal,
        "tagline": taglineValueModal,
        "fromDate": fromDateValueModal,
        "toDate": toDateValueModal,
        "location": locationValueModal,
        "description": descValueModal,
        "image": imageValueModal,
        "host": hostValueModal,
        "website": websiteValueModal
      }
      events.unshift(eventObj)

      // Reset all form values in Modal to default
      setNameValueModal("")
      setTaglineValueModal("")
      setDescValueModal("")
      setFromDateValueModal("")
      setToDateValueModal("")
      setLocationValueModal("")
      setImageValueModal(`https://picsum.photos/800/600?random=${(Math.random() * 100).toFixed()}`)
      setHostValueModal("")
      setWebsiteValueModal("")

      // Close modal
      setOpen(false)

      // Show notification
      toast.success('Operation success! New event created.');
    }, 2000)
  }

  const spinner = useRef<HTMLDivElement | null>(null)
  const imageBackground = useRef<HTMLDivElement | null>(null)

  const refreshImage = () => {
    spinner.current?.classList.add('fa-spin')

    setTimeout(() => {
      let numb = (Math.random() * 50).toFixed(0)

      setImageValueModal(`https://picsum.photos/800/600?random=${numb}`)

      if (imageBackground.current) {
        // Set background image
        imageBackground.current.style.backgroundSize = 'cover'; // Adjust background size
        toast.success("Image background set successfully.")
      }
      else {
        toast.error("Could not finish task.")
      }

      spinner.current?.classList.remove('fa-spin')
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Events :: Tabler</title>

      </Head>

      <div className="page">
        <div className="page-wrapper">
          <div className="container-xl">

            <div className="page-header d-print-none text-white">
              <div className="row g-2 align-items-center">
                <div className="col">

                  <div className="page-pretitle">
                    Home &bull; Events
                  </div>
                  <h2 className="page-title">
                    Events
                  </h2>
                </div>

                <div className="col-12 col-md-auto ms-auto d-print-none">
                  <div className="btn-list">
                    {
                      session.user.role === 'admin' && (
                        <button className="btn btn-primary d-sm-inline-block" onClick={onOpenModal}>
                          <i className="bi bi-plus me-2"></i>
                          New Event
                        </button>
                      )
                    }
                    
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button onClick={(evt) => handleViewChange(evt, false)} title="List View" type="button" className="btn bg-white text-dark border border-end">
                        <i className="bi bi-list-ol"></i>
                        {
                          eventsView === false && <div className="badge bg-dark ms-2"></div>

                        }
                      </button>
                      <button onClick={(evt) => handleViewChange(evt, true)} title="Grid View" type="button" className="btn bg-white border text-dark">
                        <i className="bi bi-grid"></i>
                        {
                          eventsView === true && <div className="badge bg-dark ms-2"></div>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page-body">
            <div className="container-xl">
              <div className="row">

                <div className="col-lg-3 col-sm-12 col-md-3 mb-3">
                  <div className="card border-0">
                    <div className="card-header border-0">
                      <h3 className="card-title fw-bold">Filter Events</h3>
                    </div>
                    <div className="card-body">
                      <form>

                        <div className="small mb-2 fw-bold">Search Text</div>
                        <div className='mb-3'>
                          <input value={searchText} onChange={(evt) => setSearchText(evt.target.value)} type="text" className="form-control" />
                        </div>

                        <div className="small mb-2 fw-bold">Date</div>
                        <div className="mb-4">
                          <input value={searchDate} onChange={(evt) => setSearchDate(evt.target.value)} className='form-control' type="date" />
                        </div>

                        <div className="">
                          <button onClick={(evt) => {
                            setSearchText('')
                            setSearchDate('')
                          }} type="reset" className="btn btn-primary w-100">
                            Reset to defaults
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
                <div className="col-lg-9 col-md-9 col-sm-12">
                  <div className='card mb-3 py-1'>

                    <div className="card-body py-3">
                      <div className="d-flex">
                        <div className="text-muted">
                          Show
                          <div className="mx-2 d-inline-block">
                            <select value={eventsPerPage} onChange={(evt) => setEventsPerPage(evt.target.value)} className='form-select form-select-sm'>
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="20">20</option>
                            </select>
                          </div>
                          items
                        </div>
                      </div>

                    </div>

                  </div>
                  {
                    eventsView === true && (
                      <div className="row row-cards">

                        {
                          filteredEvents.map(elem => (
                            <div key={elem.id} className="col-sm-6 col-lg-4">
                              <EventCard eventDetails={elem} />
                            </div>
                          ))
                        }
                      </div>
                    )
                  }

                  {
                    eventsView === false && (
                      <>
                        <div className="card">
                          <div className="table-responsive">
                            <table className="table card-table table-vcenter text-nowrap datatable">
                              <thead>
                                <tr>
                                  <th className="w-1">No.</th>
                                  <th>Title</th>
                                  <th>Start</th>
                                  <th>End</th>
                                  <th>Location</th>
                                </tr>
                              </thead>
                              <tbody>

                                {
                                  filteredEvents.map((elem, index) => (
                                    <tr style={{ cursor: 'pointer' }} onClick={(evt) => router.push(`/events/${elem.id}`)} key={'tab_' + index}>
                                      <td>
                                        {index + 1}
                                      </td>
                                      <td data-label="Name" >
                                        <div className="d-flex py-1 align-items-center">
                                          <span className="avatar me-2" style={{ backgroundImage: `url(${elem.image})` }}></span>
                                          <div className="flex-fill">
                                            <div className="font-weight-medium">{elem.name}</div>
                                            <div className="text-muted"><a href="#" className="text-reset">{elem.tagline}</a></div>
                                          </div>
                                        </div>
                                      </td>
                                      <td data-label="Title" >
                                        {elem.fromDate}
                                      </td>
                                      <td className="text-muted" data-label="Role" >
                                        {elem.toDate}
                                      </td>
                                      <td>
                                        {elem.location}
                                      </td>
                                    </tr>
                                  ))
                                }

                              </tbody>
                            </table>
                          </div>
                        </div>

                      </>
                    )
                  }

                  <div className="d-flex mt-4">
                    <div className="text-muted mt-1">{startIndex + 1} - {endIndex} of {events.length} events</div>
                    <ul className="pagination ms-auto">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="15 6 9 12 15 18" /></svg>
                          prev
                        </a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item active"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">4</a></li>
                      <li className="page-item"><a className="page-link" href="#">5</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="9 6 15 12 9 18" /></svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification components here */}

      <Toaster />

      <Modal open={open} onClose={onCloseModal} classNames={{ modal: 'customModal' }} center>
        <h2 className='border-bottom pb-3'>Add Event</h2>

        <form className='mt-3' onSubmit={handleAddEvent}>

          <div ref={imageBackground} className="mb-3 d-flex align-items-center justify-content-center rounded" style={{ height: '150px', background: `url(${imageValueModal}) no-repeat center center` }}>
            <button onClick={refreshImage} className='btn bg-white border-0' type="button" title="Click to change picture.">
              <i ref={spinner} className='fas fa-refresh me-2'></i> Refresh Image
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">Name:</label>
            <input type="text" value={nameValueModal} onChange={(evt) => setNameValueModal(evt.target.value)} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">Tag line:</label>
            <input type="text" value={taglineValueModal} onChange={(evt) => setTaglineValueModal(evt.target.value)} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">Description:</label>
            <textarea value={descValueModal} onChange={(evt) => setDescValueModal(evt.target.value)} rows={5} className='form-control' required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">From:</label>
            <input value={fromDateValueModal} onChange={(evt) => setFromDateValueModal(evt.target.value)} type="date" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">To:</label>
            <input value={toDateValueModal} onChange={(evt) => setToDateValueModal(evt.target.value)} type="date" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">Location:</label>
            <input value={locationValueModal} onChange={(evt) => setLocationValueModal(evt.target.value)} type="text" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">Host Details:</label>
            <textarea value={hostValueModal} onChange={(evt) => setHostValueModal(evt.target.value)} rows={4} className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bol">Website:</label>
            <input value={websiteValueModal} onChange={(evt) => setWebsiteValueModal(evt.target.value)} type="url" className="form-control" required />
          </div>

          <div className="mt-4 text-end">
            <button type='reset' className='btn me-3'>Reset</button>
            <button disabled={(isFormSubmitting) ? true : false} type='submit' className='btn btn-primary'>
              {(isFormSubmitting) ? <><i className='fas fa-spinner fa-spin me-2'></i> Submitting</> : 'Submit'}
            </button>
          </div>

        </form>
      </Modal>
    </>

  );
};

export default Events;
