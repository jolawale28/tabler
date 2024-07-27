import React from "react"
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import useStore from "@/data/store"; // Obtain store created with Zustand

export default function Home() {

  const session = useStore(state => state.session);

  return (
    <>
      <Head>
        <title>Home :: Tabler</title>
      </Head>

      <div className="page">
        <div className="page-wrapper">
          <div className="container-xl">

            <div className="page-header d-print-none text-white">
              <div className="row g-2 align-items-center">
                <div className="col">

                  <div className="page-pretitle">
                    Overview
                  </div>
                  <h2 className="page-title">
                    Dashboard
                  </h2>
                </div>

                <div className="col-12 col-md-auto ms-auto d-print-none">
                  <div className="btn-list">
                    {
                      session.user.role === 'admin' && (
                        <button className="btn btn-primary d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                          <i className="bi bi-plus me-2"></i>
                          New Event
                        </button>
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
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="card card-sm">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <span className="bg-blue text-white avatar">
                                <i className="bi bi-pin-map"></i>
                              </span>
                            </div>
                            <div className="col">
                              <div className="font-weight-medium">
                                Events
                              </div>
                              <div className="text-muted">
                                5 posted
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="card card-sm">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <span className="bg-green text-white avatar">
                                <i className="bi bi-people"></i>
                              </span>
                            </div>
                            <div className="col">
                              <div className="font-weight-medium">
                                Users
                              </div>
                              <div className="text-muted">
                                6 registered
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="row row-cards">
                    <div className="col-12">
                      <div className="card" style={{ height: '28rem' }}>
                        <div className="card-header card-header-light">
                          <h3 className="card-title fw-bold">Recent Activities</h3>
                        </div>
                        <div className="card-body card-body-scrollable card-body-scrollable-shadow">
                          <div className="divide-y">
                            <div>
                              <div className="row">
                                <div className="col-auto">
                                  <span className="avatar">JL</span>
                                </div>
                                <div className="col">
                                  <div className="text-truncate">
                                    <strong>Jeffie Lewzey</strong> deleted <strong>OpenHouse Hackathon Session</strong> event.
                                  </div>
                                  <div className="text-muted">yesterday</div>
                                </div>
                                <div className="col-auto align-self-center">
                                  <div className="badge bg-danger"></div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="row">
                                <div className="col-auto">
                                  <span className="avatar">MH</span>
                                </div>
                                <div className="col">
                                  <div className="text-truncate">
                                    <strong>Mallory Hulme</strong> deleted <strong>Tim-R Programming Group</strong> event.
                                  </div>
                                  <div className="text-muted">2 days ago</div>
                                </div>
                                <div className="col-auto align-self-center">
                                  <div className="badge bg-danger"></div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="row">
                                <div className="col-auto">
                                  <span className="avatar">DS</span>
                                </div>
                                <div className="col">
                                  <div className="text-truncate">
                                    <strong>Dunn Slane</strong> edited <strong>OpenEDG Certification Group Event</strong>.
                                  </div>
                                  <div className="text-muted">today</div>
                                </div>
                                <div className="col-auto align-self-center">
                                  <div className="badge bg-warning"></div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="row">
                                <div className="col-auto">
                                  <span className="avatar">EL</span>
                                </div>
                                <div className="col">
                                  <div className="text-truncate">
                                    <strong>Emmy Levet</strong> created a new event <strong>Java SE 2025 Seminar</strong>.
                                  </div>
                                  <div className="text-muted">4 days ago</div>
                                </div>
                                <div className="col-auto align-self-center">
                                  <div className="badge bg-primary"></div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="row">
                                <div className="col-auto">
                                  <span className="avatar">MJ</span>
                                </div>
                                <div className="col">
                                  <div className="text-truncate">
                                    <strong>Maryjo Lebarree</strong> added <strong>PyCon 2024 Conference</strong>.
                                  </div>
                                  <div className="text-muted">2 days ago</div>
                                </div>
                                <div className="col-auto align-self-center">
                                  <div className="badge bg-primary"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
