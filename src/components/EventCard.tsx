import React, { useEffect } from "react"
import { useRouter } from 'next/router';
import { Event } from '@/data/event';

interface EventsCardProp {
    eventDetails: Event
}

const EventCard: React.FC<EventsCardProp> = ({ eventDetails }) => {

    // For URL routing
    const router = useRouter();

    return (
        <>
            <div className="card eventcard border-0 card-sm" onClick={() => router.push(`/events/${eventDetails.id}`)}>
                <div className='rounded-top image_overlay' style={{ height: '150px', overflow: 'hidden', background: `url(${eventDetails.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
                <div className="card-body">
                    <div className='text-uppercase'><small>{eventDetails.tagline}</small></div>
                    <div>
                        <h2 className='eventcard_title'>{eventDetails.name}</h2>
                    </div>

                    <div className='row mt-3 align-content-start'>
                        <div className='col-1'>
                            <i className='far fa-calendar-alt text-muted'></i>
                        </div>
                        <div className='col-5'>
                            <div><small className='small'><small>FROM:</small></small></div>
                            <div><small>{eventDetails.fromDate}</small></div>
                        </div>
                        <div className='col-5'>
                            <div><small className=''><small>TO:</small></small></div>
                            <div><small>{eventDetails.toDate}</small></div>
                        </div>
                        <div className='col-12 mt-3'>
                            <div className='d-flex'>
                                <i className='fas fa-location text-muted me-2'></i>
                                <div>{eventDetails.location}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard