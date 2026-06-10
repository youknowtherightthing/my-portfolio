import { useState, useEffect } from 'react'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

function Storage() {
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [dragOver, setDragOver] = useState(false)

    useEffect(() => {
        fetchFiles()
    }, [])

    const fetchFiles = async () => {
        const listRef = ref(storage, 'files/')
        const res = await listAll(listRef)
        const fileData = await Promise.all(
            res.items.map(async (item) => {
                const url = await getDownloadURL(item)
                return { name: item.name, url, ref: item }
            })
        )
        setFiles(fileData)
    }

    const handleUpload = (file) => {
        if (!file) return
        setUploading(true)
        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(pct)
            },
            (error) => {
                console.error(error)
                setUploading(false)
            },
            async () => {
                setUploading(false)
                setProgress(0)
                await fetchFiles()
            }
        )
    }

    const handleDelete = async (fileRef, fileName) => {
        if (!window.confirm(`Delete ${fileName}?`)) return
        await deleteObject(fileRef)
        fetchFiles()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) handleUpload(file)
    }

    const getIcon = (name) => {
        const ext = name.split('.').pop().toLowerCase()
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️'
        if (['mp4', 'mov', 'avi'].includes(ext)) return '🎥'
        if (['mp3', 'wav'].includes(ext)) return '🎵'
        if (ext === 'pdf') return '📄'
        if (['doc', 'docx'].includes(ext)) return '📝'
        if (['zip', 'rar'].includes(ext)) return '🗜️'
        return '📁'
    }

    return (
        <div className="bg-black text-white min-h-screen px-6 py-16">
            <div className="max-w-4xl mx-auto">

                <button
                    onClick={() => navigate('/')}
                    className="text-blue-400 font-mono text-sm mb-10 hover:text-blue-300 transition"
                >
                    ← Back to Portfolio
                </button>

                <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest">My Storage</p>
                <h1 className="text-5xl font-extrabold mb-4">
                    File <span className="text-blue-500">Storage</span>
                </h1>
                <div className="border-t border-gray-800 mb-10 w-24"></div>

                {/* Upload area */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-10 text-center mb-10 transition ${dragOver ? 'border-blue-500 bg-blue-950' : 'border-gray-700 hover:border-blue-700'}`}
                >
                    <p className="text-gray-400 font-mono text-sm mb-4">Drag and drop any file here</p>
                    <p className="text-gray-600 font-mono text-xs mb-6">or</p>
                    <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition">
                        Browse File
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleUpload(e.target.files[0])}
                        />
                    </label>

                    {uploading && (
                        <div className="mt-6">
                            <p className="text-blue-400 font-mono text-sm mb-2">Uploading... {progress}%</p>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Files list */}
                <p className="text-blue-400 text-xs font-mono tracking-widest mb-6">
                    Uploaded Files ({files.length})
                </p>

                {files.length === 0 && (
                    <p className="text-gray-600 font-mono text-sm">No files uploaded yet.</p>
                )}

                <div className="flex flex-col gap-4">
                    {files.map((file) => (
                        <div key={file.name} className="flex items-center justify-between border border-gray-800 rounded-2xl p-4 hover:border-blue-700 transition">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{getIcon(file.name)}</span>
                                <div>
                                    <p className="text-white font-semibold text-sm">{file.name}</p>
                                    <p className="text-gray-600 text-xs font-mono">Click to open or share link</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">

                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-blue-700 text-blue-400 hover:bg-blue-900 text-xs font-mono px-3 py-2 rounded-lg transition"
                >
                                Open
                            </a>
                            <button
                                onClick={() => navigator.clipboard.writeText(file.url)}
                                className="border border-gray-700 text-gray-400 hover:bg-gray-800 text-xs font-mono px-3 py-2 rounded-lg transition"
                            >
                                Copy Link
                            </button>
                            <button
                                onClick={() => handleDelete(file.ref, file.name)}
                                className="border border-red-900 text-red-500 hover:bg-red-950 text-xs font-mono px-3 py-2 rounded-lg transition"
                            >
                                Delete
                            </button>
                        </div>
            </div>
          ))}
            </div>

        </div>
    </div >
  )
}

export default Storage