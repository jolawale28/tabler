import React from "react"
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import eventsData, { Event } from '../../data/event';

import toast, { Toaster } from 'react-hot-toast';

import useStore from "@/data/store"; // Obtain store created with Zustand

const EventDetails = () => {

    const session = useStore(state => state.session);

    const [editEventOn, setEditEventOn] = useState<boolean>(false)

    const router = useRouter();
    const { id } = router.query;

    // States variable for editing this event
    const [nameValueModal, setNameValueModal] = useState<string>();
    const [taglineValueModal, setTaglineValueModal] = useState<string>();
    const [descValueModal, setDescValueModal] = useState<string>();
    const [fromDateValueModal, setFromDateValueModal] = useState<string>();
    const [toDateValueModal, setToDateValueModal] = useState<string>();
    const [locationValueModal, setLocationValueModal] = useState<string>();
    const [imageValueModal, setImageValueModal] = useState<string>(`https://picsum.photos/800/600?random=8`);
    const [hostValueModal, setHostValueModal] = useState<string>();
    const [websiteValueModal, setWebsiteValueModal] = useState<string>();

    const [events, setEvents] = useState<Event[]>(eventsData);
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);

    const selectEventById = (id: number) => {
        const event = events.find((event) => event.id === id);
        setSelectedEvent(event);

        setNameValueModal(event?.name)
        setTaglineValueModal(event?.tagline)
        setDescValueModal(event?.description)
        setFromDateValueModal(event?.fromDate)
        setToDateValueModal(event?.toDate)
        setLocationValueModal(event?.location)
        setHostValueModal(event?.host)
        setWebsiteValueModal(event?.website)
    };

    const handleEdit = (evt: any) => {
        evt.preventDefault()

        toast.loading("Working...")

        // Create a new event object
        let newEvent = {
            "id": Number(id),
            "name": nameValueModal,
            "tagline": taglineValueModal,
            "description": descValueModal,
            "fromDate": fromDateValueModal,
            "toDate": toDateValueModal,
            "location": locationValueModal,
            "image": imageValueModal,
            "host": hostValueModal,
            "website": websiteValueModal
        }

        setTimeout(() => {
            // Update the events with the new Event
            const editEvent = (id: number, updatedEvent: Partial<Event>) => {
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === id ? { ...event, ...updatedEvent } : event
                    )
                );
            };

            editEvent(1, newEvent);

            setEditEventOn(false)

            toast.remove()
            toast.success("Operation success! Event details updated.")
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

    const handleDelete = (evt: any) => {
        evt.preventDefault()

        let user_prompt = confirm("You are about to delete an event! Are you sure to proceed?")

        if (user_prompt) {
            setEvents(prevEvents => prevEvents.filter(event => event.id !== Number(id)));

            toast.remove()
            toast.success("Event deleted success!")

            setTimeout(() => {
                router.push('/events')
            })
        }
    }

    useEffect(() => {
        // Check to ensure that id is a number. Parse it to a number as needed.
        // Use the conditional operator with Array.isArray()
        if (id) {
            const eventId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
            if (!isNaN(eventId)) {
                selectEventById(eventId);
            }
        }
    }, [id, events])

    return (
        <>
            <Head>
                <title>Event - {selectedEvent?.name} :: Tabler</title>
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
                                        {selectedEvent?.name}
                                    </h2>
                                </div>

                                <div className="col-12 col-md-auto ms-auto d-print-none">
                                    <div className="btn-list">
                                        {
                                            session.user.role === 'admin' && (
                                                <>
                                                    <button onClick={() => setEditEventOn(prevState => !prevState)} className="btn btn-warning-light d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                                                        <i className="bi bi-pencil-square me-2 text-info"></i>
                                                        Update
                                                    </button>
                                                    <button onClick={handleDelete} type="button" className="btn btn-warning-light">
                                                        <i className="bi bi-trash me-2 text-danger"></i> Delete
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-body">
                        <div className="container-xl">
                            <div className="row row-deck row-cards">

                                <div className="col-12">
                                    <div className="row row-cards">
                                        <div className="col-12">
                                            <div ref={imageBackground} className='rounded-top d-flex align-items-center justify-content-center' style={{ height: '300px', overflow: 'hidden', backgroundImage: `url(${selectedEvent?.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                {
                                                    editEventOn && (
                                                        <button onClick={refreshImage} className='btn bg-white border-0' type="button" title="Click to change picture.">
                                                            <i ref={spinner} className='fas fa-refresh me-2'></i> Change Image
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="row row-cards">
                                        <div className="col-sm-12 col-md-8">
                                            <div className="card">
                                                <div className="card-stamp">
                                                    <div className="card-stamp-icon bg-gray">
                                                        <i className="far fa-bell"></i>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        editEventOn === false && <>
                                                            <h1 className="mb-3">{selectedEvent?.name}</h1>
                                                            <p className="text-muted">
                                                                {selectedEvent?.description}
                                                            </p>

                                                            <h2 className="mt-4">Date & Time</h2>
                                                            <div className="mb-3">
                                                                <span>
                                                                    <i className="fas fa-calendar-alt me-3"></i> {selectedEvent?.fromDate}
                                                                </span>
                                                                <i className="fas fa-arrow-right mx-4"></i>
                                                                <span>
                                                                    <i className="fas fa-calendar-alt me-3"></i> {selectedEvent?.toDate}
                                                                </span>
                                                            </div>

                                                            <h2 className="mt-4">Location</h2>
                                                            <div>
                                                                <i className="fas fa-location me-3"></i> {selectedEvent?.location}
                                                                <div className="mt-4">
                                                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.080105429955!2d7.429900474169755!3d9.056457888560308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e74ce7f228a53%3A0xda1e86f403ab9003!2sJabi%20Park!5e0!3m2!1sen!2sng!4v1721827751401!5m2!1sen!2sng" width="100%" height="250" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }

                                                    {
                                                        editEventOn === true &&
                                                        <form onSubmit={handleEdit}>
                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Event Name</small></label>
                                                                <input type="text" value={nameValueModal} onChange={(evt) => setNameValueModal(evt.target.value)} className="form-control" />
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Tagline</small></label>
                                                                <input type="text" value={taglineValueModal} onChange={(evt) => setTaglineValueModal(evt.target.value)} className="form-control" />
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Description</small></label>
                                                                <textarea value={descValueModal} onChange={(evt) => setDescValueModal(evt.target.value)} className="form-control" rows={5} />
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Date - From</small></label>
                                                                <input value={fromDateValueModal} onChange={(evt) => setFromDateValueModal(evt.target.value)} type="date" className="form-control" />
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Date - To</small></label>
                                                                <input value={toDateValueModal} onChange={(evt) => setToDateValueModal(evt.target.value)} type="date" className="form-control" />
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Location</small></label>
                                                                <input value={locationValueModal} onChange={(evt) => setLocationValueModal(evt.target.value)} type="text" className="form-control" />
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Host Details</small></label>
                                                                <textarea value={hostValueModal} onChange={(evt) => setHostValueModal(evt.target.value)} className="form-control" rows={5} />
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="form-label text-uppercase fw-bold"><small className="fw-bold">Website</small></label>
                                                                <input value={websiteValueModal} onChange={(evt) => setWebsiteValueModal(evt.target.value)} type="url" className="form-control" />
                                                            </div>

                                                            <div>
                                                                <button type="submit" className="btn btn-primary me-3">Update</button>
                                                                <button type="reset" className="btn">Reset</button>
                                                            </div>
                                                        </form>
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-4">

                                            <div className="card mb-3">

                                                <div className="card-body">
                                                    <h3 className="mb-4">Registered Attendees</h3>
                                                    <div className="avatar-list avatar-list-stacked">
                                                        <span className="avatar avatar-sm avatar-rounded" style={{ backgroundImage: 'url(/img/avatars/000m.jpg)' }}></span>
                                                        <span className="avatar avatar-sm avatar-rounded" style={{ backgroundImage: 'url(/img/avatars/000f.jpg)' }}></span>
                                                        <span className="avatar avatar-sm avatar-rounded" style={{ backgroundImage: 'url(/img/avatars/001f.jpg)' }}></span>
                                                        <span className="avatar avatar-sm avatar-rounded" style={{ backgroundImage: 'url(/img/avatars/040f.jpg)' }}></span>
                                                        <span className="avatar avatar-sm avatar-rounded" style={{ backgroundImage: 'url(/img/avatars/040f.jpg)' }}></span>
                                                        <span className="avatar avatar-sm avatar-rounded" style={{ backgroundImage: 'url(/img/avatars/040f.jpg)' }}></span>
                                                        <span className="avatar avatar-sm avatar-rounded">+3</span>
                                                    </div>

                                                    <div className="text-muted mt-3 small">
                                                        83 participants are going for this event.
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                !editEventOn && (
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h3 className="mb-3">Host Details</h3>
                                                            <div>
                                                                <p>{selectedEvent?.host}</p>
                                                                <em>Website Link: {selectedEvent?.website}</em>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

            </div>

            <Toaster />

        </>



    )
}

export default EventDetails