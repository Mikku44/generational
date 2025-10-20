import React, { useState } from 'react'
import ReusableDialog from './Dialog'
import { Button, IconButton } from '@mui/material'
import type { Contact } from '~/models/contactModel';
import { ContactService } from 'services/contactService';
import { DeleteIcon, Trash } from 'lucide-react';

export default function ContactCard({ contact }: { contact: Contact & { id: string } }) {
    const [open, setOpen] = useState(false);

    async function readMark(id: string) {
        ContactService.update(id, { status: "read" })
    }

    async function onDelete(id: string) {
        ContactService.delete(id)
        setOpen(false);
    }
    return (
        <div

            className={`border ${contact.status == "read" ? "opacity-70" : "hover:shadow-sm"
                } border-gray-200 rounded-lg p-4  transition`}
        >
            <div className="flex justify-between items-center">
                {/* Left */}
                <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                        {contact.email} • {contact.mobile}
                    </div>
                </div>

                {/* Time */}
                <div className="text-xs text-gray-500">
                    {new Date(contact.created_at.toDate()).toLocaleString()}
                </div>
            </div>

            <div className="mt-3">
                <div className="font-semibold text-sm uppercase text-gray-700">
                    {contact.subject}
                </div>
                <p className="text-gray-800 mt-1">{contact.content}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 flex gap-2">
                {contact.status !== "read" && (
                    <button
                        onClick={() => readMark(contact.id)} // MAKE SURE id exists
                        className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
                    >
                        Mark as Read
                    </button>
                )}

                <>
                    <IconButton
                        onClick={() => setOpen(true)}
                        aria-label="delete">
                        <Trash className='size-5' />
                    </IconButton>
                    <ReusableDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        title={`Delete Contact (${contact.name})?`}
                        content={`Are you sure you want to permanently delete the contact "${contact.name}"? 
                                This action cannot be undone.`}
                        actions={
                            <>
                                <Button variant="outlined" color='inherit' onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    color="error"
                                    onClick={() => onDelete(contact.id)}
                                >
                                    Yes, Delete
                                </Button>
                            </>
                        }
                    />

                </>


            </div>
        </div>
    )
}
