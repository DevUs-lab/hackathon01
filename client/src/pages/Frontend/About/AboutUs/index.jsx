import { Typography } from 'antd'
import React from 'react'

const AboutUs = () => {
    return (
        <>
            <div className="container">
                <div className="row align-items-center g-5 g-lg-0">
                    <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                        <img
                            src="https://dawateislamimidlands.net/wp-content/uploads/elementor/thumbs/fgrf12-q3y63alubn9lcky170vwwnq0ifsfko8cbq0wmzr4b2.jpg"
                            alt="image"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <h1 className="text-center text-md-start">About us</h1>
                        <Typography.Paragraph>
                            Turpis cursus in hac habitasse platea dictumst iaculis urna id volutpat lacus.
                        </Typography.Paragraph>
                        <Typography.Paragraph style={{ textAlign: 'justify', opacity: 0.5 }}>
                            “Sit amet risus nullam eget felis eget nunc. Et ligula ullamcor malesuada proin libero nunc
                            consequat interdum. Tortor aliquam nulla facilisi cras fermentum diam sollicitudin tempor.
                            Feugiat in fermentum posuer urna nec tincidunt praesent semper. Molestie nunc non blandit
                            massa enim nec dui. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Commodo sed
                            egestas egestas fringilla phasellus.
                        </Typography.Paragraph>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AboutUs